import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import CardActionArea from "@mui/material/CardActionArea"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { graphql, navigate } from "gatsby"
import React, { useState } from "react"
import ProductCardBig from "../components/ProductCardBig"
import Seo from "../components/seo"
import { StaticImage } from "gatsby-plugin-image"
import IconButton from "@mui/material/IconButton"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import useStore from "../context/StoreContext"

const IndexPage = ({ data }) => {
  const [showCollection1, setShowCollection1] = useState(true)
  const [showCollection2, setShowCollection2] = useState(true)
  const [showCollection3, setShowCollection3] = useState(true)
  const { addVariantToCart } = useStore()

  const { nodes } = data.allShopifyProduct
  const toggleCollections1 = () => {
    setShowCollection1(!showCollection1)
  }

  const toggleCollections2 = () => {
    setShowCollection2(!showCollection2)
  }

  const toggleCollections3 = () => {
    setShowCollection3(!showCollection3)
  }

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

  const getRandomObjects = arr =>
    arr.sort(() => 0.5 - Math.random()).slice(0, 2)

  const filteredCollection1 = filterObjectsByTag(nodes, "Nightwear")
  const filteredCollection2 = filterObjectsByTag(nodes, "Bundle")
  const sideItems = getRandomObjects(nodes)

  return (
    <Box>
      <Grid container sx={{ display: "flex", alignItems: "center" }}>
        <Grid item sx={{ flex: "1" }}>
          {/* Left Box */}
          <Box
            sx={{
              marginLeft: 5,
            }}
          >
            {" "}
            <div style={{ height: "100vh" }}>
              <Grid
                container
                sx={{
                  display: {
                    xs: "none",
                    md: "block",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0,
                  },
                }}
                style={{ height: "100%" }}
              >
                {sideItems?.map((product, index) => (
                  <Grid
                    sx={{
                      padding: 0,
                      marginLeft: 10,
                    }}
                    item
                    key={index}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                  >
                    <CardActionArea
                      sx={{ padding: 0, marginTop: 5 }}
                      onClick={() => navigate(`/products/${product.handle}`)}
                    >
                      <div
                        sx={{
                          position: "relative",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          padding: 0,
                        }}
                      >
                        <CardMedia
                          component="img"
                          alt={product.title}
                          image={product.images[0]?.src}
                          sx={{
                            width: "200%",
                            height: "200%",
                            margin: 0,
                            padding: 0,
                            borderRadius: "12px",
                          }}
                        />
                      </div>
                    </CardActionArea>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                      }}
                    >
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography
                          sx={{
                            fontFamily: "Playfair Display, serif",
                            fontSize: "16px",
                            whiteSpace: "white",
                          }}
                        >
                          {product.title}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography
                            sx={{
                              fontFamily: "Playfair Display, serif",
                              fontSize: "24px",
                              whiteSpace: "normal",
                            }}
                          >
                            ${product.priceRangeV2.maxVariantPrice.amount}0
                          </Typography>
                          <IconButton
                            edge="end"
                            onClick={() => addVariantToCart(product, 1)}
                            sx={{
                              borderRadius: "50%",
                              cursor: "pointer",
                              transition:
                                "background-color 0.2s, transform 0.2s",
                              userSelect: "none",
                              outline: "none",
                              padding: 0,
                            }}
                          >
                            <ShoppingCartIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                ))}{" "}
              </Grid>{" "}
            </div>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Middle Boxes (Two boxes in a column) */}
          <Box sx={{ marginBottom: 4 }}>
            <Box py={4} padding={4} textAlign="center">
              <Typography
                variant="h2"
                color="textPrimary"
                gutterBottom
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Welcome to The Art in Lounge - For the Women of Art
              </Typography>
              <Box>
                {/* <StaticImage
                  src="../images/banner.jpg"
                  alt="Banner"
                  layout="constrained"
                  sx={{
                    width: "100%",
                    "@media (max-width: 500px)": {
                      width: "100%",
                      height: "auto",
                    },
                  }}
                /> */}
                <Typography
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: 22,
                  }}
                  variant="body1"
                  paragraph
                  sx={{ marginTop: 2, padding: 2 }}
                >
                  Welcome to our exquisite night lounge clothing company,
                  nestled in the heart of Bulgaria, where we craft the epitome
                  of sophistication and luxury. At our establishment, we
                  specialize in creating bespoke night lounge attire that exudes
                  unparalleled opulence and exclusivity. Each piece of clothing
                  is meticulously designed to reflect your unique style and
                  preferences, ensuring you step into your evenings with an aura
                  of sophistication. Our dedication to excellence is mirrored in
                  our choice of the finest fabrics, sourced from across the
                  globe, and our commitment to impeccable craftsmanship. Explore
                  our exclusive range of elegantly tailored garments and
                  experience the epitome of posh, bespoke elegance. Discover the
                  allure of handcrafted elegance at its finest and elevate your
                  nights with our extraordinary creations.
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box>{/* Content for the second middle box */}</Box>
        </Grid>
        <Grid item sx={{ flex: "1", height: "100%" }}>
          {/* Right Box */}
          <Box sx={{ marginRight: 4 }}>
            {" "}
            <div style={{ height: "100vh" }}>
              <Grid
                container
                sx={{ display: { xs: "none", md: "block" } }}
                style={{ height: "100%" }}
              >
                {sideItems?.map((product, index) => (
                  <Grid
                    item
                    sx={{ marginLeft: 10 }}
                    key={index}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                  >
                    <CardActionArea
                      sx={{ padding: 0, marginTop: 5 }}
                      onClick={() => navigate(`/products/${product.handle}`)}
                    >
                      <div
                        sx={{
                          position: "relative",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          padding: 0,
                        }}
                      >
                        <CardMedia
                          component="img"
                          alt={product.title}
                          image={product.images[0]?.src}
                          sx={{
                            width: "200%",
                            height: "200%",
                            margin: 0,
                            padding: 0,
                            borderRadius: "12px",
                          }}
                        />
                      </div>
                    </CardActionArea>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                      }}
                    >
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography
                          sx={{
                            fontFamily: "Playfair Display, serif",
                            fontSize: "16px",
                            whiteSpace: "white",
                          }}
                        >
                          {product.title}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography
                            sx={{
                              fontFamily: "Playfair Display, serif",
                              fontSize: "24px",
                              whiteSpace: "normal",
                            }}
                          >
                            ${product.priceRangeV2.maxVariantPrice.amount}0
                          </Typography>
                          <IconButton
                            edge="end"
                            onClick={() => addVariantToCart(product, 1)}
                            sx={{
                              borderRadius: "50%",
                              cursor: "pointer",
                              transition:
                                "background-color 0.2s, transform 0.2s",
                              userSelect: "none",
                              outline: "none",
                              padding: 0,
                            }}
                          >
                            <ShoppingCartIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                ))}{" "}
              </Grid>{" "}
            </div>
          </Box>
        </Grid>
      </Grid>
      {/* Right Box */}
      {/* Right Box */}

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
        <Box py={1} textAlign="center"></Box>
        {/* honey'im home */}
        <div>
          {showCollection1 ? (
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
                  Honey, I'm home! (Night & Lounge wear)
                </Typography>
                <Button
                  onClick={toggleCollections1}
                  variant="contained"
                  color="primary"
                  style={{ backgroundColor: "#8B7D9B" }}
                >
                  Hide Collection
                </Button>
              </Box>

              {/* Add a button to toggle the component visibility */}

              <Typography
                style={{ fontFamily: "Playfair Display, serif" }}
                variant="body1"
                color="textSecondary"
                paragraph
              >
                Introducing our "Honey, I'm Home!" night and lounge wear
                collection, designed to welcome you with open arms after a long
                day. This collection embodies the essence of comfort, elegance,
                and relaxation. Whether you're seeking to unwind in style or
                indulge in a cozy night at home, our carefully curated pieces
                will make you feel like you've arrived in your personal haven.
                From sumptuously soft loungewear sets to silky nightgowns, each
                garment in this collection is an invitation to embrace
                tranquility and savor the sweet moments of being home. Explore
                "Honey, I'm Home!" and elevate your evenings with a touch of
                luxury.
              </Typography>
              <Grid container spacing={3}>
                {filteredCollection1?.map((product, index) => (
                  <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                    <ProductCardBig product={product} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          ) : (
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
                Honey, I'm home! (Night & Lounge wear)
              </Typography>
              <Button
                onClick={toggleCollections1}
                variant="contained"
                color="primary"
                style={{ backgroundColor: "#8B7D9B" }}
              >
                Show Collection
              </Button>
            </Box>
          )}
        </div>

        {/* Bundles & Sets */}

        <div>
          {showCollection2 ? (
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
                  onClick={toggleCollections2}
                  variant="contained"
                  color="primary"
                  style={{ backgroundColor: "#8B7D9B" }}
                >
                  Hide Collection
                </Button>
              </Box>

              {/* Add a button to toggle the component visibility */}

              <Typography
                style={{ fontFamily: "Playfair Display, serif" }}
                variant="body1"
                color="textSecondary"
                paragraph
              >
                Indulge in the epitome of convenience and luxury with our unique
                bundle and sets, where top, bottom, and sleeves seamlessly unite
                to create a single, harmonious ensemble. These meticulously
                curated bundles redefine the essence of bespoke fashion, as each
                set is designed with your unique preferences in mind, ensuring a
                perfect synergy of style and comfort. Whether you desire an
                elegant suit, a cozy loungewear set, or a contemporary fusion of
                both, our bundles cater to your individual tastes. Experience
                the effortless luxury of complete outfits that reflect your
                personality and provide unparalleled ease in dressing. Elevate
                your wardrobe with our top-to-bottom bespoke bundles and set a
                new standard for personalized fashion.
              </Typography>
              <Grid container spacing={3}>
                {filteredCollection2?.map((product, index) => (
                  <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                    <ProductCardBig product={product} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          ) : (
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
                onClick={toggleCollections2}
                variant="contained"
                color="primary"
                style={{ backgroundColor: "#8B7D9B" }}
              >
                Show Collection
              </Button>
            </Box>
          )}
        </div>

        {/** out and about */}
        <div>
          {showCollection3 ? (
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
                  Walk and About
                </Typography>
                <Button
                  onClick={toggleCollections3}
                  variant="contained"
                  color="primary"
                  style={{ backgroundColor: "#8B7D9B" }}
                >
                  Hide Collection
                </Button>
              </Box>

              {/* Add a button to toggle the component visibility */}

              <Typography
                style={{ fontFamily: "Playfair Display, serif" }}
                variant="body1"
                color="textSecondary"
                paragraph
              >
                Step out into the world as a masterpiece with our "Walking Art –
                Out and about" collection. This extraordinary collection is a
                fusion of fashion and artistic expression, where each garment
                tells a unique story. From vibrant, eye-catching prints to
                avant-garde designs, this collection is tailored for those who
                view every street as their personal runway. Whether you're
                strolling through the city or attending a social event, our
                pieces are your canvas, allowing you to paint your own narrative
                with style and panache. Discover a world of sartorial creativity
                and become a living work of art with our "Walking Art – Out and
                about" collection.
              </Typography>
              <Grid container spacing={3}>
                {filteredCollection1?.map((product, index) => (
                  <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                    <ProductCardBig product={product} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          ) : (
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
                Walk and About
              </Typography>
              <Button
                onClick={toggleCollections3}
                variant="contained"
                color="primary"
                style={{ backgroundColor: "#8B7D9B" }}
              >
                Show Collection
              </Button>
            </Box>
          )}
        </div>
      </Container>
    </Box>
  )
}

export default IndexPage

export const query = graphql`
  {
    allShopifyProduct(limit: 50) {
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
