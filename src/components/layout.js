import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
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
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div>
        <main>{children}</main>
        <FooterContainer>
          <FooterContent></FooterContent>
        </FooterContainer>

        <ContactInfoContainer>
          <ContactColumn>
            <ContactTitle>CONTACT US</ContactTitle>
            <ContactItem>CALL US AT NO.20:</ContactItem>
            <ContactItem>+353 (01) 672 9633</ContactItem>
            <ContactItem>LINES OPEN MON-SAT</ContactItem>
            <ContactItem>10AM TO 6PM</ContactItem>
            <ContactItem>office@helenmcalinden.com</ContactItem>
          </ContactColumn>
          <ContactColumn>
            <ContactTitle>CUSTOMER SERVICES</ContactTitle>
            <ContactItem>About Us</ContactItem>
            <ContactItem>Contact Us</ContactItem>
            <ContactItem>FAQ's</ContactItem>
            <ContactItem>Delivery & Returns</ContactItem>
            <ContactItem>Size Guide</ContactItem>
          </ContactColumn>
          <ContactColumn>
            <ContactTitle>LEGAL AREA</ContactTitle>
            <ContactItem>Terms and Conditions</ContactItem>
            <ContactItem>Refund Policy</ContactItem>
            <ContactItem>Privacy Policy</ContactItem>
          </ContactColumn>
        </ContactInfoContainer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

const FooterContainer = styled.footer`
  background-color: white;
  color: white;
  padding: 20px;
`

const FooterContent = styled.div`
  max-width: 960px;
  margin: 0 auto;
`

const ContactInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
  color: white;
`

const ContactColumn = styled.div`
  flex: 1;
  padding: 20px;
  color: #ff5733;
`

const ContactTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;
`

const ContactItem = styled.p`
  font-size: 16px;
  margin: 5px 0;
`

export default Layout
