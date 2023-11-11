import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"

import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { graphql, Link } from "gatsby"
import React, { useState } from "react"
import ProductCardBig from "../components/ProductCardBig"
import Seo from "../components/seo"

import IndexUpsellItem from "../components/IndexUpsellItem"
import { useTheme } from "@mui/system"
import useMediaQuery from "@mui/material/useMediaQuery"
import IndexBanner from "../components/IndexBanner"

const LEFT_TAG_1 = "UpsellL1"
const LEFT_TAG_2 = "UpsellL2"
const LEFT_TAG_3 = "UpsellL3"
const RIGHT_TAG_1 = "UpsellR1"
const RIGHT_TAG_2 = "UpsellR2"
const RIGHT_TAG_3 = "UpsellR3"

const IndexPage = ({ data }) => {
  const [fontSize, setFontSize] = useState("1.2rem")

  const { nodes } = data.allShopifyProduct

  const filterObjectsByTag = (products, tag) => {
    let count = 0
    return products.filter(product => {
      if (count < 4) {
        if (
          product.tags &&
          Array.isArray(product.tags) &&
          product.tags.includes(tag)
        ) {
          count++
          return true
        }
      }
      return false
    })
  }

  const filteredCollection1 = filterObjectsByTag(nodes, "Nightwear")
  const filteredCollection2 = filterObjectsByTag(nodes, "Set")
  const filteredCollection3 = filterObjectsByTag(nodes, "Outwear")

  const upsellItemLeft1 = filterObjectsByTag(nodes, LEFT_TAG_1)
  const upsellItemLeft2 = filterObjectsByTag(nodes, LEFT_TAG_2)
  const upsellItemLeft3 = filterObjectsByTag(nodes, LEFT_TAG_3)

  const upsellItemRight1 = filterObjectsByTag(nodes, RIGHT_TAG_1)
  const upsellItemRight2 = filterObjectsByTag(nodes, RIGHT_TAG_2)
  const upsellItemRight3 = filterObjectsByTag(nodes, RIGHT_TAG_3)

  const theme = useTheme()
  const isMdOrSmaller = useMediaQuery(theme.breakpoints.down("md"))

  return (
    <Box>
      <Box display="flex">
        {isMdOrSmaller ? null : (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              sx={{
                fontFamily: "Great Vibes",
                fontSize: "40px",
                whiteSpace: "black",
                marginTop: 1,
                textAlign: "center",
              }}
            >
              Tailor's Pick:
            </Typography>
            <IndexUpsellItem upsellItems={upsellItemLeft1} />
            <IndexUpsellItem upsellItems={upsellItemLeft2} />
            <IndexUpsellItem upsellItems={upsellItemLeft3} />
          </Box>
        )}
        <IndexBanner />
        {isMdOrSmaller ? null : (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              sx={{
                fontFamily: "Great Vibes",
                fontSize: "40px",
                whiteSpace: "black",
                marginTop: 1,
                textAlign: "center",
              }}
            >
              Tailor's Pick:
            </Typography>
            <IndexUpsellItem upsellItems={upsellItemRight1} />
            <IndexUpsellItem upsellItems={upsellItemRight2} />
            <IndexUpsellItem upsellItems={upsellItemRight3} />
          </Box>
        )}
      </Box>

      <Container>
        <Seo title="Home" />
        <Typography
          style={{
            fontFamily: "Playfair Display, serif",
            textAlign: "center",
          }}
          variant="h3"
          color="textPrimary"
          gutterBottom
        >
          COLLECTIONS
        </Typography>

        <div>
          <Box py={4} textAlign="center">
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                style={{ fontFamily: "Playfair Display, serif" }}
                variant="h4"
                color="textPrimary"
                gutterBottom
              >
                The Artisan
              </Typography>
              <Button
                component={Link}
                to="/products?filter=Outwear"
                variant="contained"
                color="primary"
                style={{ backgroundColor: "#8B7D9B" }}
              >
                Shop Now
              </Button>
            </Box>

            {/* Add a button to toggle the component visibility */}

            <Typography
              style={{ fontFamily: "Playfair Display, serif" }}
              variant="body1"
              color="textSecondary"
              paragraph
            >
              This extraordinary collection is a fusion of fashion and artistic
              expression, where each garment tells a unique story. From vibrant,
              eye-catching bold red to avant-garde designs and eternal classics.
              Whether you're strolling through the city or attending a social
              event, our pieces are your canvas, allowing you to paint your own
              narrative with style and panache. Discover a world of sartorial
              creativity and become a living work of art with us: " The Artisan"
              collection.
            </Typography>
            <Grid container spacing={3}>
              {filteredCollection3?.map((product, index) => (
                <Grid item key={index} xs={12} sm={3} md={3} lg={3}>
                  <ProductCardBig product={product} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </div>

        <div>
          <Box py={4} tefilteredCollection1xtAlign="center">
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                style={{ fontFamily: "Playfair Display, serif" }}
                variant="h4"
                color="textPrimary"
                gutterBottom
              >
                “Honey, I’m Home” (Night & Lounge wear){" "}
              </Typography>

              <Button
                component={Link}
                to="/products?filter=Nightwear"
                variant="contained"
                color="primary"
                style={{ backgroundColor: "#8B7D9B" }}
              >
                Shop Now
              </Button>
            </Box>

            {/* Add a button to toggle the component visibility */}

            <Typography
              style={{ fontFamily: "Playfair Display, serif" }}
              variant="body1"
              color="textSecondary"
              paragraph
            >
              Night and lounge wear collection, designed to welcome you with
              open arms after a long day, and make you feel like you've arrived
              in your personal haven. This collection embodies the essence of
              comfort, elegance, and relaxation. Whether you're seeking to
              unwind in style or indulge in a cozy night at home. From
              sumptuously soft loungewear sets to silky nightgowns, each garment
              in this collection is an invitation to embrace tranquillity and
              savour the sweet moments of being home. Explore "Honey, I'm Home!"
              and elevate your evenings with a touch of the luxury of Art.
            </Typography>
            <Grid container spacing={3}>
              {filteredCollection1?.map((product, index) => (
                <Grid item key={index} xs={12} sm={3} md={3} lg={3}>
                  <ProductCardBig product={product} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </div>

        <div>
          <Box py={4} textAlign="center">
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                style={{ fontFamily: "Playfair Display, serif" }}
                variant="h4"
                color="textPrimary"
                gutterBottom
              >
                Bundles & Sets
              </Typography>
              <Button
                component={Link}
                to="/products?filter=Set"
                variant="contained"
                color="primary"
                style={{ backgroundColor: "#8B7D9B" }}
              >
                Shop now
              </Button>
            </Box>

            {/* Add a button to toggle the component visibility */}

            <Typography
              style={{ fontFamily: "Playfair Display, serif" }}
              variant="body1"
              color="textSecondary"
              paragraph
            >
              No more “I have nothing to wear it with”! Experience the
              effortless pair with our unique bundle and sets, where top,
              bottom, and sleeves seamlessly unite to create a single,
              harmonious ensemble. Whether you desire an elegant suit, a cozy
              loungewear set, or a contemporary fusion of both, our bundles
              cater to your individual tastes
            </Typography>
            <Grid container spacing={3}>
              {filteredCollection2?.map((product, index) => (
                <Grid item key={index} xs={12} sm={3} md={3} lg={3}>
                  <ProductCardBig product={product} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </div>
      </Container>
    </Box>
  )
}

export default IndexPage

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
