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

const TikTokIcon = ({ color = "#000000" }) => {
  return (
    <svg fill={color} xmlns="http://www.w3.org/2000/svg" fontSize="22px">
      <path d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z" />
    </svg>
  )
}

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
            {["New Arrivals", "Sales", "Collections", "My Cart"].map(
              (label, index) => (
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
              )
            )}
            {/* <IconButton
              aria-label="Facebook"
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
            </IconButton> */}
            {/* <IconButton
              color="primary" // Choose the appropriate color
              aria-label="Instagram"
              onClick={handleInstagramClick}
              sx={{ marginBottom: 2, color: "orange" }}
            >
              <TikTokIcon />
            </IconButton> */}
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
            {["New Arrivals", "Sales", "Collections", "My Cart"].map(
              (label, index) => (
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
              )
            )}
            {/* <IconButton
              color="primary" // Choose the appropriate color
              aria-label="Instagram"
              onClick={handleInstagramClick}
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              color="primary" // Choose the appropriate color
              aria-label="Instagram"
              onClick={handleFacebookClick}
            >
              <Facebook />
            </IconButton> */}
            {/* <IconButton
              color="primary" // Choose the appropriate color
              aria-label="Instagram"
              onClick={handleInstagramClick}
              sx={{ marginBottom: 2, color: "orange" }}
            >
              <TikTokIcon color="red" />
            </IconButton> */}
          </Tabs>
        </Drawer>
      )}
    </AppBar>
  )
}

export default Header
