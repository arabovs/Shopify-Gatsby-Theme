import React from "react"
import { navigate } from "gatsby-link"
import Card from "@mui/material/Card"
import CardActionArea from "@mui/material/CardActionArea"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { makeStyles } from "@mui/styles"
import useStore from "../context/StoreContext"

const ProductCardBig = ({ product }) => {
  const { addVariantToCart } = useStore()
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={() => navigate(`/products/${product.handle}`)}>
        <div className={classes.mediaContainer}>
          <CardMedia
            component="img"
            alt={product.title}
            height="300"
            image={product.images[0]?.src}
            className={classes.cardImage}
          />
          <IconButton
            edge="end"
            color="primary"
            className={classes.addButton}
            onClick={() => addVariantToCart(product, 1)}
          >
            <ShoppingCartIcon />
          </IconButton>
        </div>
        <CardContent className={classes.content}>
          <Typography variant="h6" className={classes.title}>
            {product.title}
          </Typography>
          <Typography variant="h6" className={classes.price}>
            ${product.priceRangeV2.maxVariantPrice.amount}0
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ProductCardBig

const useStyles = makeStyles(theme => ({
  cardImage: {
    height: "500px",
    margin: 0,
  },
  card: {
    borderRadius: 4,
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
  },
  mediaContainer: {
    position: "relative",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 0,
    maxHeight: "100px", // Adjust the maxWidth to your desired value
  },
  title: {
    fontSize: "1.25rem", // You can adjust the font size as needed
    fontWeight: 700, // Increase the font weight for a bold appearance
    color: "#333", // Use a darker color for better readability
    textTransform: "capitalize", // Capitalize the text
  },
  price: {
    fontSize: "1.5rem", // You can adjust the font size as needed
    fontWeight: 700, // Increase the font weight for a bold appearance
    color: "#ff5722", // Choose a professional color
  },
  addButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: theme.palette.primary.main,
    borderRadius: "50%",
    cursor: "pointer",
    transition: "background-color 0.2s, transform 0.2s",
    userSelect: "none",
    outline: "none",
    "& .MuiSvgIcon-root": {
      width: "24px", // Adjust the size of the shopping cart icon
      height: "24px", // Adjust the size of the shopping cart icon
      color: "white", // Set the color of the shopping cart icon
    },
    "&:hover": {
      background: theme.palette.secondary.main,
      transform: "scale(1.05)",
    },
  },
}))
