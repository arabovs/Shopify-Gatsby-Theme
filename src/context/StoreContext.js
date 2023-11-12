import React, { createContext, useState, useEffect, useContext } from "react"
import fetch from "isomorphic-fetch"
import Client from "shopify-buy"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { navigate } from "gatsby"

const client = Client.buildClient(
  {
    domain: process.env.GATSBY_SHOPIFY_STORE_URL,
    storefrontAccessToken: process.env.GATSBY_STOREFRONT_ACCESS_TOKEN,
  },
  fetch
)

// const cartCookie = Cookies.get("cart")
// const checkoutCookie = Cookies.get("checkout")

// let cart = []
// try {
//   if (cartCookie) {
//     const parsedCart = JSON.parse(cartCookie)
//     if (Array.isArray(parsedCart)) {
//       cart = parsedCart
//     } else {
//       console.log("Not a valid array:", parsedCart)
//     }
//   }
// } catch (error) {
//   console.error("Error parsing JSON:", error)
// }

let checkout = {
  id: "",
  lineItems: [],
  webUrl: "",
}

// try {
//   if (checkoutCookie) {
//     const parsedCheckout = JSON.parse(checkoutCookie)
//     if (Array.isArray(parsedCheckout)) {
//       checkout = parsedCheckout
//     } else {
//       console.log("Not a valid array:", parsedCheckout)
//     }
//   }
// } catch (error) {
//   console.error("Error parsing JSON:", error)
// }

const defaultValues = {
  cart: [],
  total: 0.0,
  loading: false,
  addVariantToCart: () => {},
  removeLineItem: () => {},
  client,
  checkout,
}

const StoreContext = createContext(defaultValues)

const isBrowser = typeof window !== `undefined`
const localStorageKey = `shopify_checkout_id`

const SuccessDialog = ({ open, onClose }) => {
  const handleGoToCart = () => {
    onClose()
    navigate("/cart")
  }
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      sx={{
        "& .MuiDialogTitle-root": {
          backgroundColor: "blue",
          color: "white",
        },
        "& .MuiDialogContent-root": {
          // Style the content
          padding: "16px",
        },
        "& .MuiDialogActions-root": {
          // Style the actions
          padding: "16px",
          justifyContent: "space-between",
        },
      }}
    >
      <DialogTitle style={{ backgroundColor: "#8B7D9B" }}>
        Item Added to Cart
      </DialogTitle>
      <DialogContent>
        <Typography
          sx={{
            fontFamily: "Playfair Display, serif",
            marginTop: 2,
            fontSize: "24px",
          }}
        >
          Your item has been added to the cart successfully.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          sx={{ marginRight: 1, backgroundColor: "#8B7D9B", color: "white" }}
        >
          Continue Shopping
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoToCart}
          sx={{ backgroundColor: "#8B7D9B" }}
        >
          Go to Cart
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState(defaultValues.cart)
  const [checkout, setCheckout] = useState(defaultValues.checkout)
  const [loading, setLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [total, setTotal] = useState(defaultValues.total)
  const handleDialogClose = () => {
    setIsDialogOpen(false)
  }

  const handleUpdateTotal = total => {
    setTotal(total)
  }

  const handleAddToCart = () => {
    setIsDialogOpen(true)
  }

  const setCheckoutItem = checkout => {
    if (isBrowser) {
      localStorage.setItem(localStorageKey, checkout.id)
    }

    setCheckout(checkout)
    // Cookies.set("checkout", JSON.stringify(checkout), {
    //   expires: 30 / (24 * 60),
    // })
  }

  useEffect(() => {
    console.log("Cart: ", cart)
  }, [cart])

  useEffect(() => {
    const initializeCheckout = async () => {
      const existingCheckoutID = isBrowser
        ? localStorage.getItem(localStorageKey)
        : null

      if (existingCheckoutID && existingCheckoutID !== `null`) {
        try {
          const existingCheckout = await client.checkout.fetch(
            existingCheckoutID
          )
          if (!existingCheckout.completedAt) {
            setCheckoutItem(existingCheckout)
            return
          }
        } catch (e) {
          localStorage.setItem(localStorageKey, null)
        }
      }

      const newCheckout = await client.checkout.create()
      setCheckoutItem(newCheckout)
    }

    initializeCheckout()
  }, [])

  const addVariantToCart = async (product, quantity, shopifyId) => {
    setLoading(true)

    if (checkout.id === "") {
      console.error("No checkout ID assigned.")
      return
    }

    const checkoutID = checkout.id
    const variantId = shopifyId.shopifyId
    const parsedQuantity = parseInt(quantity, 10)

    const lineItemsToUpdate = [
      {
        variantId,
        quantity: parsedQuantity,
      },
    ]

    try {
      const res = await client.checkout.addLineItems(
        checkoutID,
        lineItemsToUpdate
      )
      setCheckout(res)
      // Cookies.set("checkout", JSON.stringify(res), { expires: 5 / (24 * 60) })

      let updatedCart = []
      if (cart.length > 0) {
        const itemIsInCart = cart.find(
          item => item.product.variants[0]?.shopifyId === variantId
        )

        if (itemIsInCart) {
          const newProduct = {
            product: { ...itemIsInCart.product },
            quantity: itemIsInCart.quantity + parsedQuantity,
          }
          const otherItems = cart.filter(
            item => item.product.variants[0]?.shopifyId !== variantId
          )
          updatedCart = [...otherItems, newProduct]
        } else {
          updatedCart = cart.concat([{ product, quantity: parsedQuantity }])
        }
      } else {
        updatedCart = [{ product, quantity: parsedQuantity }]
      }
      console.log("updated cart", updatedCart)

      setCart(updatedCart)
      setTotal(
        updatedCart.reduce(
          (total, obj) =>
            total + parseFloat(obj.product.priceRangeV2.maxVariantPrice.amount),
          0
        )
      )

      // Cookies.set("cart", JSON.stringify(updatedCart), {
      //   expires: 30 / (24 * 60),
      // })

      setLoading(false)
      handleAddToCart()
    } catch (error) {
      setLoading(false)
      console.error(`Error in addVariantToCart: ${error}`)
    }
  }

  const removeLineItem = async variantId => {
    setLoading(true)
    try {
      if (checkout.lineItems.length < 1) throw new Error("Cart is empty")

      let lineItemID = ""
      checkout.lineItems?.forEach(item => {
        if (item.variableValues.lineItems[0]?.variantId === variantId) {
          lineItemID = item.id
        }
      })

      if (!lineItemID) {
        console.log("Product not in cart")
        return
      }

      const res = await client.checkout.removeLineItems(checkout.id, [
        lineItemID,
      ])
      setCheckout(res)
      // Cookies.set("checkout", JSON.stringify(res), { expires: 5 / (24 * 60) })

      const updatedCart = cart.filter(
        item => item.product.variants[0]?.shopifyId !== variantId
      )
      setCart(updatedCart)
      setTotal(
        updatedCart.reduce(
          (total, obj) =>
            total + parseFloat(obj.product.priceRangeV2.maxVariantPrice.amount),
          0
        )
      )

      // Cookies.set("cart", JSON.stringify(updatedCart), {
      //   expires: 30 / (24 * 60),
      // })

      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error(`Error in removeLineItem: ${error}`)
    }
  }

  return (
    <StoreContext.Provider
      value={{
        ...defaultValues,
        addVariantToCart,
        removeLineItem,
        total,
        cart,
        checkout,
        loading,
      }}
    >
      {children}
      <SuccessDialog open={isDialogOpen} onClose={handleDialogClose} />
    </StoreContext.Provider>
  )
}

const useStore = () => {
  const context = useContext(StoreContext)

  if (context === undefined) {
    throw new Error("useStore must be used within StoreContext")
  }

  return context
}

export default useStore
