import React, { useState } from "react"
import { Link } from "gatsby"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Tabs from "@mui/material/Tabs"
import Drawer from "@mui/material/Drawer"
import { Typography } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import InstagramIcon from "@mui/icons-material/Instagram"
import Facebook from "@mui/icons-material/Facebook"
import useMediaQuery from "@mui/material/useMediaQuery"

const Header = ({ siteTitle }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down("sm"))
  const instagramUrl = "https://www.instagram.com/the.art.in.lounge/"
  const facebookUrl = "https://www.facebook.com/profile.php?id=100094356706321"

  const handleInstagramClick = () => {
    window.open(instagramUrl, "_blank")
  }

  const handleFacebookClick = () => {
    window.open(facebookUrl, "_blank")
  }

  const headerTags = {
    "New Arrivals": "/products",
    Sales: "/products",
    Clothing: "/products",
    Collections: "/products",
    "My Cart": "/cart",
  }

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: "#8B7D9B" }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 16px",
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            fontFamily: "Playfair Display, serif",
          }}
        >
          <Typography
            sx={{ fontFamily: "Playfair Display, serif", color: "white" }}
            variant="h5"
            textAlign="center"
          >
            {siteTitle}
          </Typography>
        </Link>
        {isSmallScreen ? (
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{ color: "white" }}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <Tabs
            orientation="horizontal"
            value={false}
            sx={{ backgroundColor: "#8B7D9B", marginRight: 10, marginTop: 2 }}
          >
            {[
              "New Arrivals",
              "Sales",
              "Clothing",
              "Collections",
              "My Cart",
            ].map((label, index) => (
              <Link
                to={headerTags[label]}
                key={index}
                style={{
                  textDecoration: "none",
                  fontFamily: "Playfair Display, serif",
                }}
              >
                <Typography
                  id={index}
                  sx={{
                    fontSize: "22px",
                    fontFamily: "Playfair Display, serif",
                    marginLeft: 4,
                    color: "white",
                  }}
                >
                  {label}
                </Typography>
              </Link>
            ))}
            <IconButton
              aria-label="Instagram"
              onClick={handleFacebookClick}
              sx={{ marginBottom: 2, marginLeft: 4, color: "purple" }}
            >
              <Facebook sx={{ fontSize: 24 }} />
            </IconButton>
            <IconButton
              aria-label="Instagram"
              onClick={handleInstagramClick}
              sx={{ marginBottom: 2, color: "orange" }}
            >
              <InstagramIcon sx={{ fontSize: 24 }} />
            </IconButton>
          </Tabs>
        )}
      </Toolbar>
      {isSmallScreen && (
        <Drawer
          anchor="top"
          open={drawerOpen}
          onClose={toggleDrawer}
          style={{ backgroundColor: "#8B7D9B" }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={false}
            sx={{ backgroundColor: "#8B7D9B" }}
          >
            {[
              "New Arrivals",
              "Sales",
              "Clothing",
              "Collections",
              "My Cart",
            ].map((label, index) => (
              <Link
                to={headerTags[label]}
                key={index}
                style={{
                  textDecoration: "none",
                  fontFamily: "Playfair Display, serif",
                }}
              >
                <Typography
                  id={index}
                  sx={{
                    fontSize: "22px",
                    fontFamily: "Playfair Display, serif",
                    marginLeft: 4,
                    color: "white",
                  }}
                >
                  {label}
                </Typography>
              </Link>
            ))}
            <IconButton
              color="primary" // Choose the appropriate color
              aria-label="Instagram"
              onClick={handleInstagramClick}
            >
              <InstagramIcon />
            </IconButton>
          </Tabs>
        </Drawer>
      )}
    </AppBar>
  )
}

export default Header
