import React from "react"
import { graphql } from "gatsby"
import Seo from "../components/seo"
import ProductCardBig from "../components/ProductCardBig"
import Checkbox from "@mui/material/Checkbox"
import Container from "@mui/material/Container"
import FormControlLabel from "@mui/material/FormControlLabel"
import Slider from "@mui/material/Slider"
import FormControl from "@mui/material/FormControl"
import FormGroup from "@mui/material/FormGroup"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import { Typography } from "@mui/material"

const Products = ({ data }) => {
  const { nodes } = data.allShopifyProduct
  const [selectedTags, setSelectedTags] = React.useState([])
  const [selectedProductTags, setSelectedProductTags] = React.useState([])
  const [minPrice, setMinPrice] = React.useState(0)
  const [maxPrice, setMaxPrice] = React.useState(1000)
  const [filteredProducts, setFilteredProducts] = React.useState(nodes)

  const apparelTags = ["Tops", "Bottoms", "Intimates", "Hosiery"]
  React.useEffect(() => {
    filterProducts()
  }, [selectedTags, minPrice, maxPrice])

  const handleTagFilter = tag => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const handleProductTagFilter = tag => {
    if (selectedProductTags.includes(tag)) {
      setSelectedProductTags(selectedProductTags.filter(t => t !== tag))
    } else {
      setSelectedProductTags([...selectedProductTags, tag])
    }
  }

  const filterProducts = () => {
    const filtered = nodes.filter(product => {
      const productPrice = parseFloat(
        product.priceRangeV2.maxVariantPrice.amount
      )
      const isTagSelected =
        selectedTags.length === 0 ||
        selectedTags.some(tag => product.tags.includes(tag))

      return (
        productPrice >= minPrice && productPrice <= maxPrice && isTagSelected
      )
    })

    setFilteredProducts(filtered)
  }

  const getAllDistinctTags = products => {
    const distinctTags = []

    products.forEach(product => {
      if (product.tags && Array.isArray(product.tags)) {
        product.tags.forEach(tag => {
          if (!distinctTags.includes(tag) && !apparelTags.includes(tag)) {
            distinctTags.push(tag)
          }
        })
      }
    })

    return distinctTags
  }

  const filteredTags = getAllDistinctTags(nodes)

  return (
    <Container>
      <Box sx={{ marginTop: 4, marginBottom: 4 }}>
        <Seo title="Products" />
        <Box sx={{ display: "grid" }}>
          <Grid
            container
            spacing={4}
            sx={{
              marginBottom: 4,
              display: "flex",
              flexDirection: "row", // Change direction to left to right
            }}
          >
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
              <Typography
                variant="h4"
                color="textPrimary"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Collections
              </Typography>
              <FormControl component="fieldset">
                <FormGroup>
                  {filteredTags.map(tag => (
                    <FormControlLabel
                      sx={{ marginTop: 1 }}
                      id={tag}
                      key={tag}
                      control={
                        <Checkbox
                          id={tag}
                          checked={selectedTags.includes(tag)}
                          onChange={() => handleTagFilter(tag)}
                          sx={{
                            "& .MuiSvgIcon-root": {
                              // Style the checkmark icon
                              width: 20,
                              height: 20,
                              color: "#8B7D9B",
                            },
                            "&.Mui-checked": {
                              "& .MuiSvgIcon-root": {
                                color: "green",
                              },
                            },
                          }}
                        />
                      }
                      label={tag}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
              <Typography
                variant="h4"
                color="textPrimary"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Apparel
              </Typography>
              <FormControl component="fieldset">
                <FormGroup>
                  {apparelTags.map(tag => (
                    <FormControlLabel
                      sx={{ marginTop: 1 }}
                      id={tag}
                      key={tag}
                      control={
                        <Checkbox
                          id={tag}
                          checked={selectedProductTags.includes(tag)}
                          onChange={() => handleTagFilter(tag)}
                          sx={{
                            "& .MuiSvgIcon-root": {
                              // Style the checkmark icon
                              width: 20,
                              height: 20,
                              color: "#8B7D9B",
                            },
                            "&.Mui-checked": {
                              "& .MuiSvgIcon-root": {
                                color: "green",
                              },
                            },
                          }}
                        />
                      }
                      label={tag}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
              <Typography
                variant="h4"
                color="textPrimary"
                minWidth="200px"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Price Filter
              </Typography>
              <div>
                <Slider
                  value={[minPrice, maxPrice]}
                  onChange={(_, newValue) => {
                    setMinPrice(newValue[0])
                    setMaxPrice(newValue[1])
                  }}
                  valueLabelDisplay="auto"
                  min={0}
                  max={1000}
                />
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            {filteredProducts.map((product, index) => (
              <Grid item id={index} key={index} xs={12} sm={6} md={4} lg={3}>
                <ProductCardBig product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default Products

export const query = graphql`
  {
    allShopifyProduct(limit: 5) {
      nodes {
        title
        handle
        tags
        variants {
          shopifyId
        }
        priceRangeV2 {
          maxVariantPrice {
            amount
          }
        }
        description
        images {
          src
        }
      }
    }
  }
`
