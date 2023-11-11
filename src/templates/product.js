import React, { useState } from "react"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import {
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material"
import { makeStyles } from "@mui/styles"
import useStore from "../context/StoreContext"
import useInput from "../utils/useInput"
import useMediaQuery from "@mui/material/useMediaQuery"
import IndexUpsellItem from "../components/IndexUpsellItem"

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
    <Container>
      <Box sx={{ display: "flex" }}>
        {!isMdOrSmaller && (
          <Box
            sx={{
              flex: "0 0 300px",
              marginRight: 2,
              display: "flex",
              flexDirection: "column",
              marginTop: 2,
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
            padding: "16px",
          }}
        >
          <Grid item xs={12} sm={6}>
            <Box>
              <img
                src={product.images[currentImageIndex]?.src}
                alt={product.title}
                className={classes.image}
              />
              <Box sx={{ justifyContent: "space-between" }}>
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
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default ProductTemplate
