import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import Seo from "../components/seo"
import ProductCardBig from "../components/ProductCardBig"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import Slider from "@mui/material/Slider"
import Button from "@mui/material/Button"
import FormControl from "@mui/material/FormControl"
import FormGroup from "@mui/material/FormGroup"

const Products = ({ data }) => {
  const { nodes } = data.allShopifyProduct
  const [selectedTags, setSelectedTags] = React.useState([])
  const [minPrice, setMinPrice] = React.useState(0)
  const [maxPrice, setMaxPrice] = React.useState(1000)
  const [filteredProducts, setFilteredProducts] = React.useState(nodes)

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    filterProducts()
  }, [selectedTags, minPrice, maxPrice])
  /* eslint-enable react-hooks/exhaustive-deps */

  const handleTagFilter = tag => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const handlePriceFilter = () => {
    filterProducts()
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

  return (
    <Layout>
      <Seo title="Products" />
      <Wrapper>
        <FilterSection>
          <h2>Collections</h2>
          <FormControl component="fieldset">
            <FormGroup>
              <div>
                {nodes.map(product => (
                  <div key={product.handle}>
                    <FormGroup>
                      {product.tags.map(tag => (
                        <FormControlLabel
                          key={tag}
                          control={
                            <Checkbox
                              checked={selectedTags.includes(tag)}
                              onChange={() => handleTagFilter(tag)}
                            />
                          }
                          label={tag}
                        />
                      ))}
                    </FormGroup>
                  </div>
                ))}
              </div>
            </FormGroup>
          </FormControl>
          <h2>Price Range</h2>
          <div>
            <Slider
              value={[minPrice, maxPrice]}
              onChange={(e, newValue) => {
                setMinPrice(newValue[0])
                setMaxPrice(newValue[1])
              }}
              valueLabelDisplay="auto"
              min={0}
              max={1000}
            />
            <Button variant="contained" onClick={handlePriceFilter}>
              Apply
            </Button>
          </div>
        </FilterSection>
        <ProductList>
          {filteredProducts.map((product, index) => (
            <ProductCardBig key={index} product={product} />
          ))}
        </ProductList>
      </Wrapper>
    </Layout>
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

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 6fr;
  margin: 40px;
  margin-bottom: 80px;
  gap: 20px;
  max-width: 1234px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const FilterSection = styled.div`
  display: inline-block;
  width: 100%;

  @media (max-width: 768px) {
    order: -1; /* This will move the filters to the top on smaller screens */
  }
`

const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(6, auto);
  justify-content: left;
  gap: 40px;
  max-width: 1234px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(
      2,
      auto
    ); /* Adjust the number of columns for smaller screens */
  }
`
