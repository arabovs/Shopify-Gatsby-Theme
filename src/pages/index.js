import * as React from "react"
import Grid from "@mui/material/Grid"
import { graphql } from "gatsby"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Layout from "../components/layout"
import Seo from "../components/seo"
import ProductCardBig from "../components/ProductCardBig"

const IndexPage = ({ data }) => {
  const { nodes } = data.allShopifyProduct

  return (
    <Layout>
      <Seo title="Home" />
      <Box bgcolor="#f5f5f5" py={4} textAlign="center">
        <Typography variant="h4" color="textPrimary" gutterBottom>
          Welcome to Our Clothing Store
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Discover the latest trends in fashion and express your style with our
          high-quality clothing.
        </Typography>
      </Box>

      <Grid
        container
        spacing={10}
        padding={2}
        justifyContent="center"
        alignItems="center"
      >
        {nodes?.map((product, index) => (
          <Grid
            item
            key={index}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            style={{ width: "100%" }}
          >
            <ProductCardBig product={product} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  {
    allShopifyProduct(limit: 5) {
      nodes {
        title
        handle
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
