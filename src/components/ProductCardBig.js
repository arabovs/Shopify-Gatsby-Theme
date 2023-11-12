import React, { useState, useEffect } from "react"
import { navigate } from "gatsby-link"
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  useMediaQuery,
} from "@mui/material"
import { useTheme } from "@mui/system"

const ProductCardBig = ({ product }) => {
  const [fontSize, setFontSize] = useState("1.2rem")
  const theme = useTheme()
  const isMdOrSmaller = useMediaQuery(theme.breakpoints.down("md"))

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setFontSize("22px")
      } else if (window.innerWidth <= 680) {
        setFontSize("12px")
      } else if (window.innerWidth <= 880) {
        setFontSize("14px")
      } else if (window.innerWidth <= 1200) {
        setFontSize("18px")
      } else {
        setFontSize("24px")
      }
    }

    handleResize()

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

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
          backgroundColor: "white",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Playfair Display, serif",
            fontSize: fontSize,
            whiteSpace: "white",
            minHeight: "2.8em", // Minimum height for two lines
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
            fontSize: fontSize,
            whiteSpace: "normal",
          }}
        >
          BGN {Number(product.priceRangeV2.maxVariantPrice.amount).toFixed(2)}/€
          {(product.priceRangeV2.maxVariantPrice.amount / 1.95).toFixed(2)}
        </Typography>
      </Box>
    </Card>
  )
}

export default ProductCardBig
