import * as React from "react"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { graphql } from "gatsby"
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

      {/* First Additional Section - Text Info */}
      <Box bgcolor="#e0e0e0" py={4} textAlign="center">
        <Typography variant="h6" color="textPrimary" gutterBottom>
          Additional Section 1
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          This is the first additional section with text information.
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

      {/* Second Additional Section - Empty Text Space */}
      <Box bgcolor="#f0f0f0" py={4} textAlign="center">
        <Typography variant="h6" color="textPrimary" gutterBottom>
          Additional Section 2
        </Typography>
        {/* You can leave this section empty or add text/content as needed */}
      </Box>

      {/* Third Additional Section - Grid Similar to Previous */}
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
        ))}{" "}
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
