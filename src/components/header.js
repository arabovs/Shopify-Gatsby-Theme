import React, { useState } from "react"
import { Link } from "gatsby"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Tabs from "@mui/material/Tabs"
import Drawer from "@mui/material/Drawer"
import { Typography } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import Box from "@mui/material/Box"
import useMediaQuery from "@mui/material/useMediaQuery"

const Header = ({ siteTitle }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down("lg"))

  const headerTags = {
    Home: "/",
    "New Arrivals": "/products?filter=New",
    Sales: "/products?filter=Sale",
    Collections: "/products?filter=Collections",
    "My Cart": "/cart",
    Exclusive: "/products?filter=Limited",
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <Box sx={{ width: "100px" }}>
            <img
              width="88px"
              src="https://cardsbg.s3.eu-north-1.amazonaws.com/20231106_125409_0000.png"
            />
          </Box>
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
        </Box>
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
              "Exclusive",
              "New Arrivals",
              "Sales",
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
                onClick={toggleDrawer}
              >
                <Typography
                  id={index}
                  sx={{
                    fontSize: "22px",
                    fontFamily: "Playfair Display, serif",
                    marginLeft: 4,
                    color: "white",
                    textDecoration: "none",
                    fontFamily: "Playfair Display, serif",
                  }}
                >
                  {label}
                </Typography>
              </Link>
            ))}
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
              "Home",
              "Exclusive",
              "New Arrivals",
              "Sales",
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
          </Tabs>
        </Drawer>
      )}
    </AppBar>
  )
}

export default Header
