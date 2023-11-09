import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import Seo from "../components/seo"
import ProductCardBig from "../components/ProductCardBig"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import { useMediaQuery } from "@mui/material"
import FormControl from "@mui/material/FormControl"
import FormGroup from "@mui/material/FormGroup"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import ArrowRightIcon from "@mui/icons-material/ArrowRight"
import { Typography } from "@mui/material"
import IconButton from "@mui/material/IconButton"

const Products = ({ data }) => {
  const { nodes } = data.allShopifyProduct
  const [selectedTags, setSelectedTags] = React.useState([])
  const [minPrice, setMinPrice] = React.useState(0)
  const [maxPrice, setMaxPrice] = React.useState(1000)
  const [filteredProducts, setFilteredProducts] = React.useState(nodes)
  const [showCollectionFilter, setShowCollectionFilter] = useState(true)
  const [showApparelFilter, setShowApparelFilter] = useState(true)

  const collectionsTags = ["Nightwear", "Outwear", "Set"]

  const toggleCollectionFilter = () => {
    setShowCollectionFilter(!showCollectionFilter)
  }

  const toggleApparelFilter = () => {
    setShowApparelFilter(!showApparelFilter)
  }

  const isSmallScreen = useMediaQuery("(max-width:1200px)") // Adjust the breakpoint as needed

  useEffect(() => {
    if (typeof window !== "undefined") {
      const queryParams = new URLSearchParams(window.location.search)
      const filterParam = queryParams.get("filter")

      if (filterParam === "Outwear") {
        setSelectedTags(["Outwear"])
      }
      if (filterParam === "Nightwear") {
        setSelectedTags(["Nightwear"])
      }
      if (filterParam === "Set") {
        setSelectedTags(["Set"])
      }
      if (filterParam === "New") {
        setSelectedTags(["New"])
      }
      if (filterParam === "Sale") {
        setSelectedTags(["Sale"])
      }
      if (filterParam === "Limited") {
        setSelectedTags(["Limited"])
      }
      if (filterParam === "Collections") {
        setSelectedTags(["Outwear", "Nightwear", "Set"])
      }
    }
  }, [])

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
          if (!distinctTags.includes(tag) && collectionsTags.includes(tag)) {
            distinctTags.push(tag)
          }
        })
      }
    })

    return distinctTags
  }

  const filteredTags = getAllDistinctTags(nodes)
  const apparelTags = ["Dresses", "Sale", "New", "Limited"]

  return (
    <Box padding={3}>
      <Typography
        color="white"
        gutterBottom
        style={{
          textAlign: "center",
          marginTop: 4,
          fontFamily: "Great Vibes",
          color: "#4f4759",
          fontStyle: "bold",
          fontSize: 40,
          width: "100%",
          maxWidth: "100%",
        }}
      >
        Welcome to The Art in Lounge - Showcasing Women in Art
      </Typography>
      {!isSmallScreen && (
        <Box paddingLeft={12} paddingRight={12} sx={{ marginBottom: 2 }}>
          <Typography
            sx={{
              fontSize: "20px",
              fontFamily: "Playfair Display, serif",
              marginBottom: 4,
            }}
          >
            The Art in Lounge is not just a lounge wear company; it's a
            commitment to a lifestyle of comfort and elegance. At the heart of
            our brand lies a dedication to using only the finest fabrics,
            ensuring that every piece you choose is a symphony of softness and
            style. We understand that comfort is personal, and that's why we
            tailor each product to your specific needs. Whether it's a cozy
            evening at home or a leisurely weekend, our garments are designed to
            fit you like a second skin, providing the perfect balance of
            relaxation and sophistication. The Art in Lounge is where
            exceptional materials meet personalized tailoring, because we
            believe that every moment of relaxation should be an exquisite
            experience.
          </Typography>
        </Box>
      )}
      <Grid container spacing={2}>
        {/* Filter Box */}
        <Grid
          item
          xs={12} // On small screens, the box takes the full width (top position)
          sm={3} // On screens wider than 'sm' (small), the box takes 3 columns (left position)
        >
          <Box
            sx={{
              marginTop: 4,
              marginBottom: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Seo title="Products" />

            <FormControl component="fieldset">
              <Typography
                variant="h3"
                color="textPrimary"
                style={{
                  fontFamily: "Playfair Display, serif",
                  marginBottom: 10,
                }}
              >
                Filters
              </Typography>
              <Box sx={{ display: "flex" }}>
                <IconButton
                  sx={{
                    color: "black",
                    fontSize: "16px",
                    width: "auto",
                  }}
                  aria-label="Facebook"
                  onClick={toggleCollectionFilter}
                >
                  {showCollectionFilter ? (
                    <ArrowDropDownIcon sx={{ marginLeft: 1, color: "black" }} />
                  ) : (
                    <ArrowRightIcon sx={{ margiLeft: 1, color: "black" }} />
                  )}
                </IconButton>
                <Typography
                  variant="h4"
                  color="textPrimary"
                  style={{
                    fontFamily: "Playfair Display, serif",
                    marginBottom: 6,
                    marginTop: 10,
                  }}
                >
                  Collections
                </Typography>
              </Box>
              {/* Filter content goes here */}
              {showCollectionFilter &&
                filteredTags.map((tag, index) => (
                  <FormGroup key={tag}>
                    <FormControlLabel
                      id={tag}
                      control={
                        <Checkbox
                          id={tag}
                          checked={selectedTags.includes(tag)}
                          onChange={() => handleTagFilter(tag)}
                          sx={{
                            fontFamily: "Playfair Display, serif",
                            "& .MuiSvgIcon-root": {
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
                  </FormGroup>
                ))}

              {/* hahaha */}
              <Box sx={{ display: "flex" }}>
                <IconButton
                  sx={{
                    color: "black",
                    fontSize: "16px",
                    width: "auto",
                  }}
                  aria-label="Facebook"
                  onClick={toggleApparelFilter}
                >
                  {showApparelFilter ? (
                    <ArrowDropDownIcon sx={{ marginLeft: 1, color: "black" }} />
                  ) : (
                    <ArrowRightIcon sx={{ margiLeft: 1, color: "black" }} />
                  )}
                </IconButton>
                <Typography
                  variant="h4"
                  color="textPrimary"
                  style={{
                    fontFamily: "Playfair Display, serif",
                    marginBottom: 6,
                    marginTop: 10,
                  }}
                >
                  Apparel
                </Typography>
              </Box>
              {/* Filter content goes here */}
              {showApparelFilter &&
                apparelTags.map((tag, index) => (
                  <FormGroup key={tag}>
                    <FormControlLabel
                      id={tag}
                      control={
                        <Checkbox
                          id={tag}
                          checked={selectedTags.includes(tag)}
                          onChange={() => handleTagFilter(tag)}
                          sx={{
                            fontFamily: "Playfair Display, serif",
                            "& .MuiSvgIcon-root": {
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
                  </FormGroup>
                ))}
            </FormControl>
            {/* )} */}
          </Box>
        </Grid>

        {/* Map of Items Section */}
        <Grid item xs={12} sm={9}>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Grid container spacing={2}>
              {filteredProducts.map((product, index) => (
                <Grid item id={index} key={index} xs={12} sm={6} md={4} lg={3}>
                  <ProductCardBig product={product} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Products

export const query = graphql`
  {
    allShopifyProduct(limit: 100) {
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
