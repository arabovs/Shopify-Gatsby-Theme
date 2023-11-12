import React from "react"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import Box from "@mui/material/Box"
import DeleteIcon from "@mui/icons-material/Delete"
import useStore from "../context/StoreContext"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import useMediaQuery from "@mui/material/useMediaQuery"

const ProductRow = ({ item }) => {
  const { removeLineItem } = useStore()
  const { quantity, product } = item

  const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down("sm"))

  return (
    <Box width="100%" sx={{ marginTop: 1 }}>
      {isSmallScreen ? (
        // Display as a card on small screens
        <Card sx={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)" }}>
          <CardContent>
            <div style={{ textAlign: "center" }}>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "Playfair Display, serif",
                  color: "darkslategray",
                  marginBottom: 1,
                }}
              >
                {product.title}
              </Typography>
              <img
                src={product.images[0]?.src}
                alt={product.title}
                style={{
                  width: "100%",
                  maxWidth: "150px",
                  height: "auto",
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
              />
              <Typography
                sx={{
                  fontFamily: "Playfair Display, serif",
                  color: "darkslategray",
                  marginTop: 2,
                  fontSize: "20px",
                }}
              >
                Quantity:{" "}
                <span style={{ fontSize: "28px", fontStyle: "bold" }}>
                  {quantity}
                </span>
              </Typography>
            </div>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontFamily: "Playfair Display, serif",
                  fontSize: "22px",
                  color: "black",
                  marginTop: 1,
                }}
                onClick={() => removeLineItem(product.variants[0]?.shopifyId)}
              >
                Remove item:
                <DeleteIcon
                  style={{
                    fontSize: 36,
                    color: "#8B7D9B",
                  }}
                />
              </IconButton>
            </Box>
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
          <Grid
            item
            xs={6}
            sm={4}
            sx={{ textAlign: { xs: "center", sm: "left" } }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                fontFamily: "Playfair Display, serif",
                textAlign: "center",
              }}
            >
              {product.title}
            </Typography>
          </Grid>
          <Grid
            item
            xs={2}
            sm={2}
            sx={{ textAlign: { xs: "center", sm: "left" } }}
          >
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
            sx={{ textAlign: { xs: "center", sm: "left" } }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Playfair Display, serif",
                textAlign: "center",
              }}
            >
              BNG {product.priceRangeV2.maxVariantPrice.amount}/€{" "}
              {(product.priceRangeV2.maxVariantPrice.amount / 1.95).toFixed(2)}
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

      <Box sx={{ backgroundColor: "#8B7D9B", padding: 1 }}></Box>
    </Box>
  )
}

export default ProductRow
