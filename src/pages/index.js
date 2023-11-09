import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import CardActionArea from "@mui/material/CardActionArea"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { graphql, navigate, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import React, { useState, useEffect } from "react"
import ProductCardBig from "../components/ProductCardBig"
import Seo from "../components/seo"
import IconButton from "@mui/material/IconButton"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import useStore from "../context/StoreContext"

const IndexPage = ({ data }) => {
  const [fontSize, setFontSize] = useState("1.2rem")

  const { addVariantToCart } = useStore()

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 600) {
        setFontSize("1.8rem")
      } else if (window.innerWidth <= 800) {
        setFontSize("2.2rem")
      } else if (window.innerWidth <= 1200) {
        setFontSize("2.2rem")
      } else {
        setFontSize("2.6rem")
      }
    }

    handleResize()

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

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

  const getRandomObjects = arr =>
    arr.sort(() => 0.5 - Math.random()).slice(0, 2)

  const filteredCollection1 = filterObjectsByTag(nodes, "Nightwear")
  const filteredCollection2 = filterObjectsByTag(nodes, "Set")
  const filteredCollection3 = filterObjectsByTag(nodes, "Outwear")
  const sideItems = getRandomObjects(nodes)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  return (
    <Box>
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          justifyItems: "center",
        }}
      >
        <Grid item sx={{ flex: "1" }}>
          {/* Left Box */}
          <Box>
            {" "}
            <Box
              sx={{
                height: "170vh",
                display: {
                  xs: "none",
                  sm: "none",
                  md: "block",
                  lg: "block",
                },
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Great Vibes",
                  fontSize: "40px",
                  whiteSpace: "black",
                  width: "100%",
                  marginLeft: 10,
                  marginBottom: 4,
                }}
              >
                Tailor's Pick:
              </Typography>{" "}
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
                    item
                    sx={{ marginLeft: 10, marginBottom: 4, width: "100%" }}
                    key={index}
                    xs={12}
                    sm={4}
                    md={4}
                    lg={3}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Playfair Display, serif",
                        fontSize: "20px",
                        whiteSpace: "white",
                        flex: 1,
                        width: "200%",
                        position: "relative",
                        marginLeft: "-10px", // Adjust this value to match the parent's margin
                        marginBottom: "-4px", // Adjust this value to match the parent's margin
                      }}
                    >
                      {product.title}
                    </Typography>
                    <CardActionArea
                      sx={{ padding: 0, marginTop: 1 }}
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
                            borderRadius: "4px",
                          }}
                        />
                      </div>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-around",
                        }}
                      >
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                            // onClick={() => addVariantToCart(product, 1)}
                          >
                            <IconButton
                              edge="end"
                              sx={{
                                borderRadius: "50%",
                                marginLeft: 4,
                                cursor: "pointer",
                                transition:
                                  "background-color 0.2s, transform 0.2s",
                                userSelect: "none",
                                outline: "none",
                                padding: 0,
                              }}
                            >
                              <Typography
                                sx={{
                                  fontFamily: "Playfair Display, serif",
                                  fontSize: "24px",
                                  whiteSpace: "normal",
                                }}
                              >
                                Buy
                              </Typography>{" "}
                              <Typography
                                sx={{
                                  fontFamily: "Playfair Display, serif",
                                  fontSize: "24px",
                                  whiteSpace: "normal",
                                  marginLeft: 1,
                                }}
                              >
                                ${product.priceRangeV2.maxVariantPrice.amount}0
                              </Typography>{" "}
                              <ShoppingCartIcon sx={{ marginLeft: 2 }} />
                            </IconButton>
                          </Box>
                        </Box>
                      </Box>
                    </CardActionArea>
                  </Grid>
                ))}{" "}
              </Grid>{" "}
            </Box>
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
          <Box>
            <Box textAlign="center">
              <Box
                py={4}
                padding={4}
                textAlign="center"
                sx={{ position: "relative" }}
              >
                <Typography
                  color="white"
                  gutterBottom
                  style={{
                    marginTop: 4,
                    fontFamily: "Great Vibes",
                    position: "absolute",
                    top: "20",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "80%",
                    zIndex: 1,
                    color: "#4f4759",
                    fontStyle: "bold",
                    fontSize: fontSize,
                  }}
                >
                  Welcome to The Art in Lounge
                  <br />
                  Showcasing Women in Art
                </Typography>

                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <StaticImage
                    src="../images/banner.jpg"
                    alt="Banner"
                    layout="constrained"
                    sx={{
                      width: "100%",
                    }}
                  />
                </Box>
                <Paper
                  elevation={4}
                  sx={{
                    marginTop: 4,
                    backgroundColor: "#8B7D9B",
                  }}
                >
                  <Link
                    to="/products"
                    style={{
                      textDecoration: "none",
                      fontFamily: "Great Vibes",
                    }}
                    sx={{}}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Great Vibes",
                        color: "white",
                        lineHeight: "1.8",
                      }}
                      variant="h3"
                      textAlign="center"
                    >
                      Shop Now
                    </Typography>
                  </Link>
                </Paper>
              </Box>

              {!isSmallScreen && (
                <Typography
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: 22,
                  }}
                  variant="body1"
                  paragraph
                  sx={{ marginTop: 2, padding: 2 }}
                >
                  Dear you, Welcome to Art in Lounge! Your fashion soulmate, and
                  place of artistry and freedom. At our establishment we will
                  greet you with classical elegance to bold colours. Each piece
                  of clothing is meticulously designed to reflect your unique
                  style and preferences, escaping from the fast fashion trends,
                  and ensuring you step into your evenings with an aura of
                  sensuality. Expression of character through clothing is a
                  powerful tool. And we will help you use it! Welcome to your
                  exquisite night lounge clothing partner, nestled in the heart
                  of Bulgaria, where we craft the epitome of artistry and
                  comfort.
                </Typography>
              )}
            </Box>
          </Box>
          <Box>{/* Content for the second middle box */}</Box>
        </Grid>
        <Grid item sx={{ flex: "1", height: "100%", width: "100%" }}>
          {/* Right Box */}
          <Box>
            {" "}
            <Box
              sx={{
                height: "170vh",
                display: {
                  xs: "none",
                  sm: "none",
                  md: "none",
                  myBreakpoint: "block",
                  lg: "block",
                },
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Great Vibes",
                  fontSize: "40px",
                  whiteSpace: "black",
                  width: "100%",
                  marginLeft: 10,
                  marginBottom: 4,
                }}
              >
                Exclusive Offers:
              </Typography>{" "}
              <Grid
                container
                sx={{ display: { xs: "none", md: "block" } }}
                style={{ height: "100%" }}
              >
                {sideItems?.map((product, index) => (
                  <Grid
                    item
                    sx={{
                      marginLeft: 10,
                      marginBottom: 4,
                    }}
                    key={index}
                    xs={12}
                    sm={4}
                    md={4}
                    lg={3}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Playfair Display, serif",
                        fontSize: "20px",
                        whiteSpace: "white",
                        flex: 1,
                        width: "200%",
                        position: "relative",
                        marginLeft: "-10px", // Adjust this value to match the parent's margin
                        marginBottom: "-4px", // Adjust this value to match the parent's margin
                      }}
                    >
                      {product.title}
                    </Typography>
                    <CardActionArea
                      sx={{ padding: 0, marginTop: 1 }}
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
                            borderRadius: "4px",
                          }}
                        />
                      </div>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-around",
                        }}
                      >
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            {/* <Typography
                            sx={{
                              fontFamily: "Playfair Display, serif",
                              fontSize: "24px",
                              whiteSpace: "normal",
                            }}
                          >
                            ${product.priceRangeV2.maxVariantPrice.amount}0
                          </Typography> */}
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                              // onClick={() => addVariantToCart(product, 1)}
                            >
                              <IconButton
                                edge="end"
                                sx={{
                                  borderRadius: "50%",
                                  marginLeft: 4,
                                  cursor: "pointer",
                                  transition:
                                    "background-color 0.2s, transform 0.2s",
                                  userSelect: "none",
                                  outline: "none",
                                  padding: 0,
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontFamily: "Playfair Display, serif",
                                    fontSize: "24px",
                                    whiteSpace: "normal",
                                  }}
                                >
                                  Buy
                                </Typography>{" "}
                                <Typography
                                  sx={{
                                    fontFamily: "Playfair Display, serif",
                                    fontSize: "24px",
                                    whiteSpace: "normal",
                                    marginLeft: 1,
                                  }}
                                >
                                  ${product.priceRangeV2.maxVariantPrice.amount}
                                  0
                                </Typography>{" "}
                                <ShoppingCartIcon sx={{ marginLeft: 2 }} />
                              </IconButton>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </CardActionArea>
                  </Grid>
                ))}{" "}
              </Grid>{" "}
            </Box>
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
