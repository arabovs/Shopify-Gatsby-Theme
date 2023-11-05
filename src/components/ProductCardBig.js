import React from "react"
import { navigate } from "gatsby-link"
import Card from "@mui/material/Card"
import CardActionArea from "@mui/material/CardActionArea"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import useStore from "../context/StoreContext"

const ProductCardBig = ({ product }) => {
  const { addVariantToCart } = useStore()

  return (
    <Card
      sx={{
        borderRadius: 4,
        padding: 0,
        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
      }}
    >
      <CardActionArea
        sx={{ padding: 0 }}
        onClick={() => navigate(`/products/${product.handle}`)}
      >
        <div
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 0,
            maxHeight: "100px",
          }}
        >
          <CardMedia
            component="img"
            alt={product.title}
            height="300"
            image={product.images[0]?.src}
            sx={{
              height: "500px",
              margin: 0,
            }}
          />
          <IconButton
            edge="end"
            color="primary"
            onClick={() => addVariantToCart(product, 1)}
            sx={{
              position: "absolute",
              top: 20,
              right: 20,
              backgroundColor: "#8B7D9B",
              borderRadius: "50%",
              cursor: "pointer",
              transition: "background-color 0.2s, transform 0.2s",
              userSelect: "none",
              outline: "none",
              padding: 0,
              "& .MuiSvgIcon-root": {
                width: "24px",
                height: "24px",
                color: "white",
              },
              "&:hover": {
                background: "#8B7D9B",
                transform: "scale(1.05)",
              },
            }}
          >
            <ShoppingCartIcon />
          </IconButton>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 0,
            }}
          >
            <Typography
              sx={{
                fontFamily: "Playfair Display, serif",
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "#333",
                textTransform: "capitalize",
                padding: 0,
              }}
              variant="h6"
            >
              {product.title}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Playfair Display, serif",
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#ff5722",
                padding: 0,
              }}
              variant="h6"
            >
              ${product.priceRangeV2.maxVariantPrice.amount}0
            </Typography>
          </CardContent>
        </div>
      </CardActionArea>
    </Card>
  )
}

export default ProductCardBig
