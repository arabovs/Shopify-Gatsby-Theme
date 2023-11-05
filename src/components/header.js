import React, { useState } from "react"
import { Link } from "gatsby"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Drawer from "@mui/material/Drawer"
import { Typography } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import useMediaQuery from "@mui/material/useMediaQuery"

const Header = ({ siteTitle }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down("sm"))

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
        <Typography
          sx={{ fontFamily: "Playfair Display, serif" }}
          variant="h5"
          textAlign="center"
        >
          {siteTitle}
        </Typography>
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
            {["New Arrivals", "Clothing", "Collections", "My Cart"].map(
              (label, index) => (
                <Link
                  to="/products"
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
            {["New Arrivals", "Clothing", "Collections", "My Cart"].map(
              (label, index) => (
                <Link
                  to="/products"
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
          </Tabs>
        </Drawer>
      )}
    </AppBar>
  )
}

export default Header
