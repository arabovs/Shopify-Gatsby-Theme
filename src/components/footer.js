import React from "react"
import Toolbar from "@mui/material/Toolbar"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
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
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#8B7D9B",
        flexWrap: "wrap",
      }}
    >
      <Tabs
        value={false}
        sx={{
          "& .MuiTabs-flexContainer": {
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          },
        }}
      >
        {footerLinks.map((link, index) => (
          <Link
            id={link.to}
            to={link.to}
            sx={{
              color: "white",
              fontSize: "16px",
              fontWeight: "normal",
              textDecoration: "none",
              flexBasis: "25%",
              textAlign: "center",
              padding: "8px",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
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
