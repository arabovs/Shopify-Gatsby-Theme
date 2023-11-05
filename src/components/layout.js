import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Container from "@mui/material/Container"
import { makeStyles } from "@mui/styles"

import Header from "./header"

const useStyles = makeStyles(theme => ({
  contactInfo: {
    backgroundColor: "#014c40", // Background color for the contact info section
    color: "white", // Text color
    padding: theme.spacing(2),
  },
  contactColumn: {
    padding: theme.spacing(2),
  },
  contactTitle: {
    fontSize: 20,
    marginBottom: theme.spacing(2),
  },
  contactItem: {
    fontSize: 16,
    margin: theme.spacing(1, 0),
  },
  customContainer: {
    paddingLeft: 0,
    paddingRight: 0,
  },
}))

const Layout = ({ children }) => {
  const classes = useStyles()
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Container className={classes.customContainer} maxWidth="lg">
        {children}
      </Container>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
