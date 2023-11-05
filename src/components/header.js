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
    backgroundColor: "#37382e",
  },
  siteTitle: {
    flexGrow: 1,
    textDecoration: "none",
    color: "white",
    fontWeight: "bold",
    fontSize: "24px",
  },
  menuButton: {
    color: "white",
  },
  menuLink: {
    textDecoration: "none",
    color: "white",
    fontSize: "16px",
    fontWeight: "normal",
    margin: "0 15px",
  },
  drawer: {
    backgroundColor: "#37382e",
  },
  drawerLink: {
    textDecoration: "none",
    color: "white",
    fontSize: "16px",
    fontWeight: "normal",
  },
}))

const Header = ({ siteTitle }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient) {
      import("@mui/material/useMediaQuery").then(
        ({ default: useMediaQuery }) => {
          setIsSmallScreen(useMediaQuery(theme => theme.breakpoints.down("sm")))
        }
      )
    }
  }, [isClient])

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
