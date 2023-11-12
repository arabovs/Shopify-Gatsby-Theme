import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material"
import fetch from "isomorphic-fetch"
import React, { createContext, useContext, useEffect, useState } from "react"
import Client from "shopify-buy"
import { navigate } from "gatsby"

const client = Client.buildClient(
  {
    domain: process.env.GATSBY_SHOPIFY_STORE_URL,
    storefrontAccessToken: process.env.GATSBY_STOREFRONT_ACCESS_TOKEN,
  },
  fetch
)

let checkout = {
  id: "",
  lineItems: [],
  webUrl: "",
}

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
const localStorageKeyItems = `shopify_checkout_lines`
const localStorageKeyCart = `shopify_cart`
const localStorageKeyTotal = `shopify_total`

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
          padding: "16px",
        },
        "& .MuiDialogActions-root": {
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

  const handleAddToCart = () => {
    setIsDialogOpen(true)
  }

  const setCheckoutItem = checkout => {
    if (isBrowser) {
      localStorage.setItem(localStorageKey, checkout.id)
      localStorage.setItem(
        localStorageKeyItems,
        JSON.stringify(checkout.lineItems)
      )
    }

    setCheckout(checkout)
  }

  const transformArray = arrayOfObjects => {
    return arrayOfObjects.map(inputObject => {
      const { quantity, variant, ...restOftheKeys } = inputObject
      const images = variant ? [variant.image] : undefined
      const priceRangeV2 = variant ? { maxVariantPrice: 0 } : undefined
      const shopifyId = variant ? inputObject.id : undefined
      return {
        quantity,
        product: { ...restOftheKeys, images, priceRangeV2, shopifyId },
      }
    })
  }

  useEffect(() => {
    const initializeCheckout = async () => {
      const existingCheckoutID = isBrowser
        ? localStorage.getItem(localStorageKey)
        : null

      const existingLineItems = isBrowser
        ? JSON.parse(localStorage.getItem(localStorageKeyItems))
        : null

      const existingCart = isBrowser
        ? JSON.parse(localStorage.getItem(localStorageKeyCart))
        : null

      const existingTotal = isBrowser
        ? localStorage.getItem(localStorageKeyTotal)
        : null

      if (existingCheckoutID && existingCheckoutID !== `null`) {
        try {
          const existingCheckout = await client.checkout.fetch(
            existingCheckoutID
          )

          if (!existingCheckout.completedAt) {
            setCheckoutItem(existingCheckout)
            setCart(existingCart)
            setTotal(Number(existingTotal))
            return
          }
        } catch (e) {
          localStorage.setItem(localStorageKey, null)
        }
      }

      if (existingLineItems && existingLineItems !== `null`) {
        checkout.lineItems = existingLineItems
      }

      const newCheckout = await client.checkout.create()
      setCheckoutItem(newCheckout)
    }

    initializeCheckout()
  }, [])

  const addVariantToCart = async (product, quantity, shopifyId) => {
    setLoading(true)

    console.log("hey")
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
      localStorage.setItem(localStorageKeyCart, JSON.stringify(updatedCart))
      const totalValue = updatedCart.reduce(
        (total, obj) =>
          total + parseFloat(obj.product.priceRangeV2.maxVariantPrice.amount),
        0
      )
      setTotal(totalValue)
      // localStorage.setItem(localStorageKeyTotal, totalValue)

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
      Object.entries(checkout.lineItems).map(([key, value]) => {
        if (variantId === value.variant?.id) {
          lineItemID = value.id
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
      localStorage.setItem(localStorageKeyCart, JSON.stringify(updatedCart))
      const totalValue = updatedCart.reduce(
        (total, obj) =>
          total + parseFloat(obj.product.priceRangeV2.maxVariantPrice.amount),
        0
      )
      setTotal(totalValue)
      localStorage.setItem(localStorageKeyTotal, totalValue)

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
