import React, { useState } from "react"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
} from "@mui/material"
import { makeStyles } from "@mui/styles"
import IndexUpsellItem from "../components/IndexUpsellItem"
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
  container: {
    display: "flex",
    justifyContentt: "center" /* Horizontal centering */,
    alignItems: "center" /* Vertical centering */,
    height: "100vh" /* Adjust the height as needed */,
  },
  imageContainer: {
    marginTop: 10,
    position: "relative",
    textAlign: "center",
    overflow: "hidden", // Ensure that the slider buttons stay within the container
  },
  image: {
    maxWidth: "100%",
    height: "auto",
    transition: "transform 0.5s ease-in-out",
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
  sliderButtons: {
    position: "absolute",
    bottom: "50%",
    left: "10%",
    right: "10%",
    display: "flex",
    justifyContent: "space-between",
  },
  arrowIcon: {
    fontSize: 30,
    color: "#8B7D9B",
    cursor: "pointer",
  },
}))

const VariantCard = ({ variant, product }) => {
  return (
    <Card>
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontFamily: "Playfair Display, serif" }}
        >
          {variant.title}
        </Typography>
        <Typography sx={{ fontFamily: "Playfair Display, serif" }}>
          <strong>Quantity:</strong> {variant.inventoryQuantity}
        </Typography>
        <Typography sx={{ fontFamily: "Playfair Display, serif" }}>
          <strong>Price:</strong> BGN{variant.price}
          {"/"} €
          {(product.priceRangeV2.maxVariantPrice.amount / 1.95).toFixed(2)}
        </Typography>
      </CardContent>
    </Card>
  )
}

const ProductTemplate = ({ pageContext }) => {
  const { product } = pageContext
  const { upsells } = pageContext
  const isMdOrSmaller = useMediaQuery("(max-width: 960px)")
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0])
  const [shopifyVariantId, setShopifyVariantId] = useState(product.variants[0])

  const handleShopifyVariantIdChange = shopifyId => {
    setShopifyVariantId(shopifyId)
  }

  const handleVariantChange = event => {
    const selectedIndex = event.target.value
    setSelectedVariant(product.variants[selectedIndex])
    handleShopifyVariantIdChange(product.variants[selectedIndex]?.shopifyId)
  }

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
    <Box padding={1}>
      <Box sx={{ display: "flex" }}>
        {!isMdOrSmaller && (
          <Box
            sx={{
              flex: "0 0 300px",
              display: "flex",
              flexDirection: "column",
              marginTop: 10,
            }}
          >
            <Typography
              sx={{
                fontFamily: "Great Vibes",
                fontSize: "30px",
                textAlign: "center",
              }}
            >
              Buy Now:
            </Typography>
            <IndexUpsellItem upsellItems={upsells} />
          </Box>
        )}
        <Grid
          container
          spacing={4}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid item xs={12} sm={6} display="flex" alignItems="flex-start">
            <div className={classes.imageContainer}>
              <img
                src={product.images[currentImageIndex]?.src}
                alt={product.title}
                className={classes.image}
                style={{ width: "65%", height: "65%" }}
              />
              <div className={classes.sliderButtons}>
                <div onClick={prevImage}>
                  <ArrowBackIcon className={classes.arrowIcon} />
                </div>
                <div onClick={nextImage}>
                  <ArrowForwardIcon className={classes.arrowIcon} />
                </div>
              </div>
            </div>
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
                <span style={{ fontWeight: "bold" }}>Price:</span> BGN{" "}
                {`${product.priceRangeV2.maxVariantPrice.amount}0`}
                {"/"} €
                {(product.priceRangeV2.maxVariantPrice.amount / 1.95).toFixed(
                  2
                )}
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
              {isMdOrSmaller && (
                <Button
                  variant="contained"
                  className={classes.addToCartButton}
                  onClick={() =>
                    addVariantToCart(product, bind.value, shopifyVariantId)
                  }
                  sx={{ backgroundColor: "#8B7D9B" }}
                >
                  Add to Cart
                </Button>
              )}
              <Typography
                sx={{
                  fontFamily: "Great Vibes",
                  fontSize: "44px",
                }}
              >
                Select your variant:
              </Typography>
              <form className={classes.inputForm}>
                <FormControl>
                  <InputLabel id="variant-select-label"></InputLabel>
                  <Select
                    labelId="variant-select-label"
                    id="variant-select"
                    value={product.variants.indexOf(selectedVariant)}
                    onChange={handleVariantChange}
                    sx={{
                      fontFamily: "Playfair Display, serif",
                    }}
                  >
                    {product.variants.map((variant, index) => (
                      <MenuItem
                        sx={{
                          fontFamily: "Playfair Display, serif",
                        }}
                        key={index}
                        value={index}
                      >
                        {variant.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <VariantCard variant={selectedVariant} product={product} />
              </form>
              {!isMdOrSmaller && (
                <Button
                  variant="contained"
                  className={classes.addToCartButton}
                  onClick={() =>
                    addVariantToCart(product, bind.value, shopifyVariantId)
                  }
                  sx={{ backgroundColor: "#8B7D9B" }}
                >
                  Add to Cart
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default ProductTemplate
