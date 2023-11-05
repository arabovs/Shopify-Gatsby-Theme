import React from "react"
import { navigate } from "gatsby-link"
import Box from "@mui/material/Box"
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
        borderRadius: 1,
        padding: 0,
        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 1,
          backgroundColor: "#8B7D9B",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Playfair Display, serif",
            fontSize: "20px",
            whiteSpace: "white",
          }}
        >
          {product.title}
        </Typography>
      </CardContent>
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
          }}
        >
          <CardMedia
            component="img"
            alt={product.title}
            image={product.images[0]?.src}
            sx={{
              margin: 0,
            }}
          />
        </div>
      </CardActionArea>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Playfair Display, serif",
            fontSize: "24px",
            whiteSpace: "normal",
          }}
        >
          ${product.priceRangeV2.maxVariantPrice.amount}0
        </Typography>
        <IconButton
          edge="end"
          onClick={() => addVariantToCart(product, 1)}
          sx={{
            borderRadius: "50%",
            cursor: "pointer",
            transition: "background-color 0.2s, transform 0.2s",
            userSelect: "none",
            outline: "none",
            padding: 0,
          }}
        >
          <ShoppingCartIcon />
        </IconButton>
      </Box>
    </Card>
  )
}

export default ProductCardBig
