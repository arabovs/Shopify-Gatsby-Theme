import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Drawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: "#37382e", // Header background color
  },
  siteTitle: {
    flexGrow: 1,
    textDecoration: "none",
    color: "white", // Site title text color
    fontWeight: "bold",
    fontSize: "24px", // Site title font size
  },
  menuButton: {
    color: "white", // Menu icon button color
  },
  menuLink: {
    textDecoration: "none",
    color: "white", // Menu links text color
    fontSize: "16px", // Menu links font size
    fontWeight: "normal",
    margin: "0 15px", // Menu links spacing
  },
  drawer: {
    backgroundColor: "#37382e", // Drawer background color
  },
  drawerLink: {
    textDecoration: "none",
    color: "white", // Drawer links text color
    fontSize: "16px", // Drawer links font size
    fontWeight: "normal",
  },
}))

const Header = ({ siteTitle }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false) // State for media query
  const classes = useStyles()

  // Conditionally import useMediaQuery
  useEffect(() => {
    import("@mui/material/useMediaQuery").then(({ default: useMediaQuery }) => {
      setIsSmallScreen(useMediaQuery(theme => theme.breakpoints.down("sm")))
      setIsClient(true)
    })
  }, [])

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Link to="/" className={classes.siteTitle}>
          {siteTitle}
        </Link>
        {isClient && isSmallScreen ? (
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <Tabs value={false}>
            <Link to="/products" className={classes.menuLink}>
              <Tab label="New Arrivals" />
            </Link>
            <Link to="/products" className={classes.menuLink}>
              <Tab label="Clothing" />
            </Link>
            <Link to="/products" className={classes.menuLink}>
              <Tab label="Collections" />
            </Link>
            <Link to="/cart" className={classes.menuLink}>
              <Tab label="My Cart" />
            </Link>
          </Tabs>
        )}
      </Toolbar>
      <Drawer anchor="top" open={drawerOpen} onClose={toggleDrawer}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={false}
          indicatorColor="primary"
          className={classes.drawer}
        >
          <Link to="/products" className={classes.drawerLink}>
            <Tab label="New Arrivals" />
          </Link>
          <Link to="/products" className={classes.drawerLink}>
            <Tab label="Clothing" />
          </Link>
          <Link to="/products" className={classes.drawerLink}>
            <Tab label="Collections" />
          </Link>
          <Link to="/cart" className={classes.drawerLink}>
            <Tab label="My Cart" />
          </Link>
        </Tabs>
      </Drawer>
    </AppBar>
  )
}

export default Header
