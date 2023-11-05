import * as React from "react"
import PropTypes from "prop-types"
import Container from "@mui/material/Container"

const Layout = ({ children }) => {
  return (
    <>
      <Container maxWidth="lg">{children}</Container>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
