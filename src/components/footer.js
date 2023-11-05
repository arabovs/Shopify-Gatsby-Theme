import React from "react"
import Toolbar from "@mui/material/Toolbar"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import { Link } from "gatsby"
import { makeStyles } from "@mui/styles"

const footerLinks = [
  { label: "Contact Us", to: "/contact" },
  { label: "About Us", to: "/about" },
  { label: "Legal", to: "/legal" },
  { label: "Deliveries and Returns", to: "/deliveries-returns" },
]

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: "#37382e", // Footer background color
  },
  footerLink: {
    color: "white", // Footer links text color
    fontSize: "16px", // Footer links font size
    fontWeight: "normal",
    margin: "0 15px", // Footer links spacing
  },
}))

const Footer = () => {
  const classes = useStyles()

  return (
    <Toolbar>
      <Tabs value={false}>
        {footerLinks.map((link, index) => (
          <Link
            id={link.to}
            to={link.to}
            className={classes.footerLink}
            key={index}
          >
            <Tab label={link.label} />
          </Link>
        ))}
      </Tabs>
    </Toolbar>
  )
}

export default Footer
