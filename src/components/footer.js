import React from "react"
import Grid from "@mui/material/Grid"
import Toolbar from "@mui/material/Toolbar"
import Box from "@mui/material/Menu"
import Typography from "@mui/material/Typography"
import Icon from "@mui/material/Icon"
import InstagramIcon from "@mui/icons-material/Instagram"
import Facebook from "@mui/icons-material/Facebook"
import IconButton from "@mui/material/IconButton"
import { Link } from "gatsby"

const footerLinks = [
  { label: "Contact Us", to: "/contact" },
  { label: "About Us", to: "/about" },
  { label: "Legal", to: "/legal" },
  { label: "Deliveries and Returns", to: "/deliveries-returns" },
]

const Footer = () => {
  const instagramUrl = "https://www.instagram.com/the.art.in.lounge/"
  const facebookUrl = "https://www.facebook.com/profile.php?id=100094356706321"

  const handleInstagramClick = () => {
    window.open(instagramUrl, "_blank")
  }

  const handleFacebookClick = () => {
    window.open(facebookUrl, "_blank")
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
          key="contacts"
          sx={{ marginTop: 1 }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}></Box>
          <Typography
            id="contacts"
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
        <Grid item xs={12} lg={3} key="contacts" sx={{ marginTop: 1 }}>
          <Typography
            sx={{
              fontSize: "22px",
              fontFamily: "Playfair Display, serif",
              marginTop: 4,
              marginBottom: 3,
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          ></Box>
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
        {/* {footerLinks.map((link, index) => (
          <Grid
            item
            xs={12} // On extra small screens, take up the full width (stacked)
            lg={3} // On large screens, take up 3/12 of the available width
            key={index}
          >
            <Link
              id={link.to}
              to={link.to}
              style={{
                textDecoration: "none",
                fontFamily: "Playfair Display, serif",
              }}
            >
              <Typography
                id={link.label}
                sx={{
                  fontSize: "22px",
                  fontFamily: "Playfair Display, serif",
                  color: "white",
                  width: "100%",
                  textAlign: "center", // Center the text
                }}
              >
                {link.label}
              </Typography>
            </Link>
          </Grid>
        ))} */}
      </Grid>
    </Toolbar>
  )
}

export default Footer
