import React, { createContext, useState, useEffect, useContext } from "react"
import fetch from "isomorphic-fetch"
import Client from "shopify-buy"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import Button from "@mui/material/Button"
import { navigate } from "gatsby"

const client = Client.buildClient(
  {
    domain: process.env.GATSBY_SHOPIFY_STORE_URL,
    storefrontAccessToken: process.env.GATSBY_STOREFRONT_ACCESS_TOKEN,
  },
  fetch
)

const defaultValues = {
  cart: [],
  loading: false,
  addVariantToCart: () => {},
  removeLineItem: () => {},
  client,
  checkout: {
    id: "",
    lineItems: [],
    webUrl: "",
  },
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
      fullWidth
      maxWidth="xs"
      sx={{
        "& .MuiDialogTitle-root": {
          // Style the title
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
      <DialogTitle>Item Added to Cart</DialogTitle>
      <DialogContent>
        <p>Your item has been added to the cart successfully.</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ marginRight: 1 }}>
          Continue Shopping
        </Button>
        <Button variant="contained" color="primary" onClick={handleGoToCart}>
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
  const handleDialogClose = () => {
    setIsDialogOpen(false)
  }

  const handleAddToCart = () => {
    // Add item to the cart logic here
    setIsDialogOpen(true)
  }

  const setCheckoutItem = checkout => {
    if (isBrowser) {
      localStorage.setItem(localStorageKey, checkout.id)
    }

    setCheckout(checkout)
  }

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

  const addVariantToCart = async (product, quantity) => {
    setLoading(true)

    if (checkout.id === "") {
      console.error("No checkout ID assigned.")
      return
    }

    const checkoutID = checkout.id
    const variantId = product.variants[0]?.shopifyId
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
      setCart(updatedCart)

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

      const updatedCart = cart.filter(
        item => item.product.variants[0]?.shopifyId !== variantId
      )
      setCart(updatedCart)
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
