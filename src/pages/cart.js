import React from "react"
import Container from "@mui/material/Container"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import { makeStyles } from "@mui/styles"
import useStore from "../context/StoreContext"
import ProductRow from "../components/ProductRow"
import PrimaryButton from "../components/PrimaryButton"

const useStyles = makeStyles(theme => ({
  wrapper: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(4),
  },
  headerWrapper: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: theme.spacing(4),
  },
  text: {
    fontWeight: 600,
    fontSize: 14,
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "flex-end",
  },
}))

const Cart = () => {
  const { cart, checkout } = useStore()
  const classes = useStyles()

  return (
    <Container>
      <Paper className={classes.wrapper}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              My Cart
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.headerWrapper}>
            <Typography className={classes.text}>Product</Typography>
            <Typography className={classes.text}>Quantity</Typography>
            <Typography className={classes.text}>Remove Item</Typography>
          </Grid>
          {cart.length > 0 ? (
            cart.map((item, index) => <ProductRow key={index} item={item} />)
          ) : (
            <Typography>Your cart is empty.</Typography>
          )}
          <div className={classes.buttonWrapper}>
            <PrimaryButton
              text="Checkout"
              onClick={() => window.open(checkout.webUrl)}
              disabled={cart.length === 0}
            />
          </div>
        </Grid>
      </Paper>
    </Container>
  )
}

export default Cart
