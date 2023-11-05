import React from "react"

import Header from "../components/header"
import Footer from "../components/footer"

import { StoreProvider } from "./StoreContext"

const CombinedProvider = ({ element }) => {
  return (
    <div>
      <Header siteTitle={`The Art in Lounge`} />
      <StoreProvider>{element}</StoreProvider>
      <Footer />
    </div>
  )
}

export default CombinedProvider
