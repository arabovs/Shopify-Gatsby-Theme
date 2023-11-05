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

const Products = ({ data }) => {
  const { nodes } = data.allShopifyProduct
  const [selectedTags, setSelectedTags] = React.useState([])
  const [minPrice, setMinPrice] = React.useState(0)
  const [maxPrice, setMaxPrice] = React.useState(1000)
  const [filteredProducts, setFilteredProducts] = React.useState(nodes)

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
          if (!distinctTags.includes(tag)) {
            distinctTags.push(tag)
          }
        })
      }
    })

    return distinctTags
  }

  const filteredTags = getAllDistinctTags(nodes)

  return (
    <Box sx={{ marginTop: 4 }}>
      <Seo title="Products" />
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 2fr" }}>
        <Box sx={{ maxWidth: "20%", marginLeft: 4 }}>
          <h2>Collections</h2>
          <FormControl component="fieldset">
            <FormGroup>
              {filteredTags.map(tag => (
                <FormControlLabel
                  id={tag}
                  key={tag}
                  control={
                    <Checkbox
                      id={tag}
                      checked={selectedTags.includes(tag)}
                      onChange={() => handleTagFilter(tag)}
                    />
                  }
                  label={tag}
                />
              ))}
            </FormGroup>
          </FormControl>
          <h2>Price Range</h2>
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
        </Box>

        <Grid container spacing={2}>
          {filteredProducts.map((product, index) => (
            <Grid
              item
              id={index}
              key={index}
              xs={6}
              sm={6}
              md={4}
              lg={4}
              xl={2}
            >
              <ProductCardBig product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
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
