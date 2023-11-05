import React from "react"
import { ThemeProvider } from "@mui/material/styles"
import theme from "../theme" // Import your custom theme

import Header from "../components/header"
import Footer from "../components/footer"

import { StoreProvider } from "./StoreContext"

const CombinedProvider = ({ element }) => {
  return (
    <ThemeProvider theme={theme}>
      <Header siteTitle={`The Art in Lounge`} />
      <StoreProvider>{element}</StoreProvider>
      <Footer />
    </ThemeProvider>
  )
}

export default CombinedProvider
