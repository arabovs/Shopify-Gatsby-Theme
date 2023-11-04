import React from "react"
import { navigate } from "gatsby-link"
import Paper from "@mui/material/Paper"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { makeStyles } from "@mui/styles"
import useStore from "../context/StoreContext"

const ProductCard = ({ product }) => {
  const { addVariantToCart } = useStore()
  const classes = useStyles()

  return (
    <Paper className={classes.wrapper}>
      <Grid container direction="column">
        <Grid item>
          <Button
            className={classes.addButton}
            onClick={() => addVariantToCart(product, 1)}
          >
            <Typography variant="subtitle1">+</Typography>
          </Button>
        </Grid>
        <Grid item>
          <Paper
            className={classes.contentWrapper}
            onClick={() => navigate(`/products/${product.handle}`)}
          >
            <img
              src={product.images[0]?.src}
              alt={product.title}
              className={classes.image}
            />
            <div className={classes.textWrapper}>
              <Typography className={classes.title} variant="subtitle1">
                {product.title}
              </Typography>
              <Typography className={classes.price} variant="subtitle1">
                {`${product.priceRangeV2.maxVariantPrice.amount}0$`}
              </Typography>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default ProductCard

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: "grid",
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    borderRadius: 20,
    gap: 10,
    cursor: "pointer",
    position: "relative",
    boxShadow:
      "0px 20px 40px rgba(52, 53, 99, 0.2), 0px 1px 3px rgba(0, 0, 0, 0.05)",
  },
  addButton: {
    position: "absolute",
    top: 10,
    right: 10,
    background: "#014c40",
    padding: 10,
    width: 40,
    height: 40,
    borderRadius: "20%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      transform: "scale(1.2)",
      transition: "0.2s",
    },
  },
  contentWrapper: {},
  image: {
    width: 200,
    height: 300,
    objectFit: "cover",
    borderRadius: 20,
    margin: 0,
  },
  textWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    borderRadius: "0 0 10px 10px",
    background: "rgba(255, 255, 255, 0.2)",
    width: 200,
    height: 50,
    backdropFilter: "blur(40px)",
  },
  title: {
    fontWeight: 400,
    textAlign: "center",
    margin: 0,
    color: "#014c40",
  },
  price: {
    fontWeight: "normal",
    textAlign: "center",
    margin: 0,
  },
}))
