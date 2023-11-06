import React from "react"
import Container from "@mui/material/Container"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import ProductRow from "../components/ProductRow"
import useStore from "../context/StoreContext"

const Cart = () => {
  const { cart, checkout } = useStore()

  const renderProductHeader = () => (
    <Grid
      container
      sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4 }}
    >
      <Grid item xs={4}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, fontFamily: "Playfair Display, serif" }}
        >
          Product
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, fontFamily: "Playfair Display, serif" }}
        >
          Quantity
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, fontFamily: "Playfair Display, serif" }}
        >
          Remove Item
        </Typography>
      </Grid>
    </Grid>
  )

  const renderCartItems = () => {
    if (cart.length > 0) {
      return cart.map((item, index) => <ProductRow key={index} item={item} />)
    } else {
      return (
        <Typography
          sx={{ fontFamily: "Playfair Display, serif" }}
          variant="body1"
        >
          Your cart is empty.
        </Typography>
      )
    }
  }

  const handleCheckout = () => {
    if (cart.length > 0) {
      window.open(checkout.webUrl)
    }
  }

  return (
    <Container>
      <Paper sx={{ marginTop: 4, padding: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontFamily: "Playfair Display, serif" }}
            >
              My Cart
            </Typography>
          </Grid>
          {renderProductHeader()}
          {renderCartItems()}
          <Grid item xs={12}>
            <div sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                onClick={handleCheckout}
                disabled={cart.length === 0}
                sx={{ backgroundColor: "#8B7D9B" }}
              >
                Checkout
              </Button>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default Cart
