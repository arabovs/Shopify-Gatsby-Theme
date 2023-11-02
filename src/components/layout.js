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
          <FooterContent>
            <SignupSection>
              <SignupTitle>SIGN UP</SignupTitle>
              <SignupDescription>
                Sign-up to our Newsletter to receive updates on events,
                collections, and exclusive promotions
              </SignupDescription>
              <SignupForm>
                <EmailInput type="email" placeholder="Enter your email" />
                <SubscribeButton>SUBSCRIBE</SubscribeButton>
              </SignupForm>
              <TermsAndConditions>
                By signing up, you agree with our{" "}
                <a href="#">Terms and Conditions</a>, and{" "}
                <a href="#">Privacy and Cookie Policy</a>.
              </TermsAndConditions>
            </SignupSection>
          </FooterContent>
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

const Footer = styled.footer`
  padding: 40px;
  font-family: BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
    "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 40px;
  width: fit-content;

  a {
    color: rgba(0, 0, 0, 0.4);
  }
`

const FooterContainer = styled.footer`
  background-color: #333;
  color: white;
  padding: 20px;
`

const FooterContent = styled.div`
  max-width: 960px;
  margin: 0 auto;
`

const SignupSection = styled.div`
  text-align: center;
`

const SignupTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`

const SignupDescription = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`

const SignupForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 20px;
`

const EmailInput = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  margin-bottom: 10px;
  border: 1px solid #666;
`

const SubscribeButton = styled.button`
  background-color: #ff5733;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
  &:hover {
    background-color: #ff4500;
  }
`

const TermsAndConditions = styled.p`
  font-size: 14px;
  a {
    color: #ff5733;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
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
