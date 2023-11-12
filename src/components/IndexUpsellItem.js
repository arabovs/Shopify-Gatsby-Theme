import {
  Avatar,
  Box,
  CardActionArea,
  CardMedia,
  Typography,
} from "@mui/material"
import React from "react"
import { navigate } from "gatsby"
import FavoriteIcon from "@mui/icons-material/Favorite"

const IndexUpsellItem = ({ upsellItems }) => {
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
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
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
                  BGN{" "}
                  {Number(product.priceRangeV2.maxVariantPrice.amount).toFixed(
                    2
                  )}
                  /€{" "}
                  {(product.priceRangeV2.maxVariantPrice.amount / 1.95).toFixed(
                    2
                  )}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    )
  }

  return null // Return null if no upsell items
}

export default IndexUpsellItem
