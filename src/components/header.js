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

const Header = ({ siteTitle }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#8B7D9B" }}
      alignItems="center"
    >
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
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer}
          sx={{ color: "white" }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Drawer anchor="top" open={drawerOpen} onClose={toggleDrawer}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={false}
          indicatorColor="primary"
          sx={{ backgroundColor: "#8B7D9B" }}
        >
          {["New Arrivals", "Clothing", "Collections", "My Cart"].map(
            (label, index) => (
              <Link
                to="/products"
                sx={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "normal",
                }}
                key={index}
              >
                <Tab label={label} />
              </Link>
            )
          )}
        </Tabs>
      </Drawer>
    </AppBar>
  )
}

export default Header
