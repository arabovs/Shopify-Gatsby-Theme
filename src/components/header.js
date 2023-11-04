import * as React from "react"
import styled from "styled-components"

import PropTypes from "prop-types"
import { Link, useStaticQuery, graphql } from "gatsby"

const Header = ({ siteTitle }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  console.log(data)
  return (
    <HeaderWrapper>
      <Link to="/" className="site-title">
        {siteTitle}
      </Link>
      <LinksWrapper>
        <Link to="/products">New Arrivals</Link>
        <Link to="/products">Clothing</Link>
        <Link to="/products">Collections</Link>
        <Link to="/cart">My Cart</Link>
      </LinksWrapper>
    </HeaderWrapper>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

const HeaderWrapper = styled.header`
  padding: 40px;
  display: flex;
  justify-content: space-between;

  .site-title {
    font-weight: bold;
    color: #014c40;
  }

  a {
    text-decoration: none;
    color: black;
    font-size: 15px;
    font-weight: normal;
    text-transform: uppercase;
    font-family: BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
      Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

    :hover {
      text-decoration: underline;
    }
  }
`
const LinksWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, auto);
  gap: 40px;
`
