import React, { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import { StaticImage } from "gatsby-plugin-image"
import useStore from "../context/StoreContext"
import { Link } from "gatsby"
import { useTheme } from "@mui/system"
import useMediaQuery from "@mui/material/useMediaQuery"

const IndexBanner = () => {
  const [fontSize, setFontSize] = useState("1.2rem")
  const theme = useTheme()
  const isMdOrSmaller = useMediaQuery(theme.breakpoints.down("md"))

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

  return (
    <Box textAlign="center">
      <Box py={4} padding={4} textAlign="center" sx={{ position: "relative" }}>
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

      {!isMdOrSmaller && (
        <Typography
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: 22,
          }}
          variant="body1"
          paragraph
          sx={{ marginTop: 2, padding: 2 }}
        >
          Dear you, Welcome to Art in Lounge! Your fashion soulmate, and place
          of artistry and freedom. At our establishment we will greet you with
          classical elegance to bold colours. Each piece of clothing is
          meticulously designed to reflect your unique style and preferences,
          escaping from the fast fashion trends, and ensuring you step into your
          evenings with an aura of sensuality. Expression of character through
          clothing is a powerful tool. And we will help you use it! Welcome to
          your exquisite night lounge clothing partner, nestled in the heart of
          Bulgaria, where we craft the epitome of artistry and comfort.
        </Typography>
      )}
    </Box>
  )
}

export default IndexBanner
