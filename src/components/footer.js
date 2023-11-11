import React from "react"
import Grid from "@mui/material/Grid"
import Toolbar from "@mui/material/Toolbar"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import InstagramIcon from "@mui/icons-material/Instagram"
import Facebook from "@mui/icons-material/Facebook"
import IconButton from "@mui/material/IconButton"
import { Link } from "gatsby"

const Footer = () => {
  const instagramUrl = "https://www.instagram.com/the.art.in.lounge/"
  const facebookUrl = "https://www.facebook.com/profile.php?id=100094356706321"

  const handleInstagramClick = () => {
    window.open(instagramUrl, "_blank")
  }

  const handleFacebookClick = () => {
    window.open(facebookUrl, "_blank")
  }

  const TikTokIcon = ({ color = "#000000" }) => {
    return (
      <svg fill={color} xmlns="http://www.w3.org/2000/svg" fontSize="22px">
        <path d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z" />
      </svg>
    )
  }

  return (
    <Toolbar
      sx={{
        backgroundColor: "#8B7D9B",
      }}
    >
      <Grid
        container
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between", // Center with space between
          alignContent: "center",
          backgroundColor: "#8B7D9B",
        }}
      >
        <Grid
          item
          xs={12} // On extra small screens, take up the full width (stacked)
          lg={3} // On large screens, take up 3/12 of the available width
          key="contacts-grid"
          sx={{ marginTop: 1 }}
        >
          <Typography
            id="contacts-title"
            variant="h3"
            sx={{
              fontSize: "22px",
              fontFamily: "Playfair Display, serif",
              color: "white",
              width: "100%",
              textAlign: "center", // Center the text
              marginBottom: 0.5,
              marginTop: 0.5,
            }}
          >
            Contact Us
          </Typography>
          <Typography
            id="contacts"
            sx={{
              fontSize: "16px",
              fontFamily: "Playfair Display, serif",
              color: "white",
              width: "100%",
              textAlign: "center", // Center the text
              marginTop: 2,
            }}
          >
            +359 882 56 85 17
            <br />
            artinlounge@yahoo.com
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          lg={3}
          key="contacts"
          sx={{ marginTop: 1, display: "flex", flexDirection: "column" }}
        >
          <Link
            to="/terms"
            style={{
              textDecoration: "none",
              fontFamily: "Playfair Display, serif",
            }}
          >
            <Typography
              sx={{
                fontSize: "22px",
                fontFamily: "Playfair Display, serif",
                color: "white",
                width: "100%",
                textAlign: "center", // Center the text
              }}
            >
              Terms & Agreements
            </Typography>
          </Link>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              width="100px"
              src="https://cardsbg.s3.eu-north-1.amazonaws.com/20231106_125409_0000.png"
              alt="Your Image Alt Text"
            />
          </Box>

          <Typography
            sx={{
              fontSize: "22px",
              fontFamily: "Playfair Display, serif",
              marginBottom: 1,
              textAlign: "center",
              color: "white",
            }}
          >
            ® Copyrights of The Art in Lounge - 2023 ®
          </Typography>
        </Grid>
        <Grid
          item
          xs={12} // On extra small screens, take up the full width (stacked)
          lg={3} // On large screens, take up 3/12 of the available width
          key="followus"
          sx={{ marginTop: 1 }}
        >
          <Typography
            id="followus"
            variant="h3"
            sx={{
              fontSize: "22px",
              fontFamily: "Playfair Display, serif",
              color: "white",
              width: "100%",
              textAlign: "center", // Center the text
              marginBottom: 0.5,
              marginTop: 0.5,
            }}
          >
            Follow Us
          </Typography>
          <IconButton
            sx={{ color: "white", width: "100%", fontSize: "16px" }}
            aria-label="Facebook"
            onClick={handleFacebookClick}
          >
            Facebook <Facebook sx={{ marginLeft: 1 }} />
          </IconButton>
          <IconButton
            sx={{ color: "white", width: "100%", fontSize: "16px" }}
            aria-label="Instagram"
            onClick={handleInstagramClick}
          >
            Instagram <InstagramIcon sx={{ marginLeft: 1 }} />
          </IconButton>
        </Grid>
      </Grid>
    </Toolbar>
  )
}

export default Footer
