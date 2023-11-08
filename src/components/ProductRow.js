import React from "react"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import Box from "@mui/material/Box"
import DeleteIcon from "@mui/icons-material/Delete"
import useStore from "../context/StoreContext"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"

const ProductRow = ({ item }) => {
  const { removeLineItem } = useStore()
  const { quantity, product } = item

  const isSmallScreen = window.innerWidth < 800 // Adjust the breakpoint as needed

  return (
    <Box width="100%">
      {isSmallScreen ? (
        // Display as a card on small screens
        <Card>
          <CardContent>
            <img
              src={product.images[0]?.src}
              alt={product.title}
              style={{
                width: "100%",
                maxWidth: "80px",
                height: "auto",
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Playfair Display, serif",
                textAlign: "center",
              }}
            >
              {product.title}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Playfair Display, serif",
                textAlign: "center",
              }}
            >
              {quantity}
            </Typography>
            <IconButton
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                justifyItems: "center",
              }}
              color="secondary"
              onClick={() => removeLineItem(product.variants[0]?.shopifyId)}
            >
              <DeleteIcon />
            </IconButton>
          </CardContent>
        </Card>
      ) : (
        // Display as a row on medium and larger screens
        <Grid container alignItems="center" sx={{ marginBottom: 2 }}>
          <Grid
            item
            xs={12}
            sm={2}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <img
              src={product.images[0]?.src}
              alt={product.title}
              style={{
                width: "100%",
                maxWidth: "80px",
                height: "auto",
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Playfair Display, serif",
                textAlign: "center",
              }}
            >
              {product.title}
            </Typography>
          </Grid>
          <Grid item xs={2} sm={2}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Playfair Display, serif",
                textAlign: "center",
              }}
            >
              {quantity}
            </Typography>
          </Grid>
          <Grid
            item
            xs={2}
            sm={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <IconButton
              color="secondary"
              onClick={() => removeLineItem(product.variants[0]?.shopifyId)}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      )}
    </Box>
  )
}

export default ProductRow
