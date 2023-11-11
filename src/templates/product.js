import React, { useState } from "react"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import { makeStyles } from "@mui/styles"
import useStore from "../context/StoreContext"
import useInput from "../utils/useInput"

const useStyles = makeStyles(theme => ({
  backButton: {
    cursor: "pointer",
    color: theme.palette.primary.main,
    fontSize: 14,
    fontWeight: 600,
    marginLeft: theme.spacing(2),
  },

  image: {
    width: "90%",
    height: "auto",
    borderRadius: "6px",
  },

  inputForm: {
    display: "grid",
    gridTemplateColumns: "repeat(2, auto)",
    width: "fit-content",
    gap: theme.spacing(4),
    alignItems: "center",
  },
  input: {
    padding: theme.spacing(2),
    maxWidth: 80,
    fontSize: 12,
    "&:focus": {
      outline: "none",
      outlineColor: theme.palette.primary.main,
    },
  },
}))

const ProductTemplate = ({ pageContext }) => {
  const { product } = pageContext
  // const { upsells } = pageContext
  // console.log(upsells)

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const { addVariantToCart } = useStore()
  const bind = useInput(1)
  const classes = useStyles()

  const prevImage = () => {
    setCurrentImageIndex(prevIndex =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    )
  }

  const nextImage = () => {
    setCurrentImageIndex(prevIndex =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    )
  }

  return (
    <Container>
      <Box>
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
          container
          spacing={4}
        >
          <Grid item xs={12} sm={6}>
            <Box>
              <img
                src={product.images[currentImageIndex]?.src}
                alt={product.title}
                className={classes.image}
              />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  onClick={prevImage}
                  variant="contained"
                  color="primary"
                  sx={{ backgroundColor: "#8B7D9B" }}
                >
                  Previous
                </Button>
                <Button
                  onClick={nextImage}
                  variant="contained"
                  color="primary"
                  sx={{ backgroundColor: "#8B7D9B", marginRight: 7 }}
                >
                  Next
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: "grid",
                alignItems: "flex-start",
                height: "fit-content",
                gap: 2,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "Playfair Display, serif",
                }}
              >
                {product.title}
              </Typography>
              <Typography
                sx={{
                  fontSize: "24px",
                  fontFamily: "Playfair Display, serif",
                }}
              >
                <span style={{ fontWeight: "bold" }}>Price:</span>{" "}
                {`${product.priceRangeV2.maxVariantPrice.amount}0$`}{" "}
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  fontFamily: "Playfair Display, serif",
                }}
              >
                <span style={{ fontWeight: "bold" }}>Product Description:</span>{" "}
                {product.description}
              </Typography>
              <form className={classes.inputForm}>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontFamily: "Playfair Display, serif",
                    fontWeight: "bold",
                  }}
                  variant="subtitle1"
                >
                  Quantity:
                </Typography>
                <TextField
                  id="qty"
                  variant="outlined"
                  type="number"
                  {...bind}
                  inputProps={{ className: classes.input }}
                />
              </form>
              <Button
                variant="contained"
                className={classes.addToCartButton}
                onClick={() => addVariantToCart(product, bind.value)}
                sx={{ backgroundColor: "#8B7D9B" }}
              >
                Add to Cart
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default ProductTemplate
