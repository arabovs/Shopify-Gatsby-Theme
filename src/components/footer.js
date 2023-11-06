import React from "react"
import Grid from "@mui/material/Grid"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { Link } from "gatsby"

const footerLinks = [
  { label: "Contact Us", to: "/contact" },
  { label: "About Us", to: "/about" },
  { label: "Legal", to: "/legal" },
  { label: "Deliveries and Returns", to: "/deliveries-returns" },
]

const Footer = () => {
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
        {footerLinks.map((link, index) => (
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
        ))}
      </Grid>
    </Toolbar>
  )
}

export default Footer
