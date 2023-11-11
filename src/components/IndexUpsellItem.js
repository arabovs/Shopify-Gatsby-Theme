import React from "react"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import CardActionArea from "@mui/material/CardActionArea"
import CardMedia from "@mui/material/CardMedia"
import Avatar from "@mui/material/Avatar"
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout"
import Typography from "@mui/material/Typography"
import { navigate } from "gatsby"
import IconButton from "@mui/material/IconButton"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import FavoriteIcon from "@mui/icons-material/Favorite"
import useStore from "../context/StoreContext"
import { keyframes } from "@emotion/react"

const borderAnimation = keyframes`
  0% {
    border-color: #8B7D9B;
  }
  50% {
    border-color: pink;  // Change to a different color at 50%
  }
  100% {
    border-color: #8B7D9B;
  }
`

const IndexUpsellItem = ({ upsellItems }) => {
  const { addVariantToCart } = useStore()
  if (upsellItems.length > 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
        }}
      >
        {upsellItems?.map((product, index) => (
          <Box
            item
            key={index}
            xs={12}
            sm={4}
            md={4}
            lg={3}
            sx={{
              border: "3px solid #8B7D9B",
              borderRadius: "5px",
              // animation: `${borderAnimation} 10s infinite`,
              position: "relative",
            }}
          >
            <Avatar
              sx={{
                backgroundColor: "#8B7D9B",
                position: "absolute",
                width: "40px",
                height: "auto",
                top: "-14px",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <FavoriteIcon />
            </Avatar>
            <Typography
              sx={{
                fontFamily: "Playfair Display, serif",
                fontSize: "20px",
                whiteSpace: "white",
                marginBottom: 2,
                marginTop: 2,
                textAlign: "center", // Center the text
              }}
            >
              {product.title}
            </Typography>
            <CardActionArea
              sx={{
                padding: 0,
                marginTop: 1,
                display: "flex",
                flexDirection: "column",
              }}
              onClick={() => navigate(`/products/${product.handle}`)}
            >
              <CardMedia
                component="img"
                alt={product.title}
                image={product.images[0]?.src}
                sx={{
                  width: "50%",
                  height: "auto",
                  borderRadius: "4px",
                }}
              />
            </CardActionArea>
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start", // Align items along the main axis (vertical)
                  alignItems: "flex-start", // Align items along the cross axis (horizontal)
                  marginLeft: 1,
                  marginTop: 0.5,
                  marginBottom: 1,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: "18px",
                    whiteSpace: "normal",
                    textAlign: "left",
                  }}
                >
                  BGN {product.priceRangeV2.maxVariantPrice.amount}0
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: "18px",
                    whiteSpace: "normal",
                    textAlign: "left",
                  }}
                >
                  €{" "}
                  {(product.priceRangeV2.maxVariantPrice.amount / 1.95).toFixed(
                    2
                  )}
                </Typography>
              </Box>

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
          </Box>
        ))}
      </Box>
    )
  }

  return null // Return null if no upsell items
}

export default IndexUpsellItem
