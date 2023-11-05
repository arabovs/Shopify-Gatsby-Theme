import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import { makeStyles } from "@mui/styles"

import Header from "./header"

const useStyles = makeStyles(theme => ({
  layout: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    backgroundColor: "#f5f5f5", // Background color for the content
  },
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
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <main className={classes.layout}>
        <Container className={classes.customContainer} maxWidth="lg">
          {children}
        </Container>
      </main>
      <Paper className={classes.contactInfo}>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <div className={classes.contactColumn}>
                <Typography variant="h5" className={classes.contactTitle}>
                  CONTACT US
                </Typography>
                <Typography className={classes.contactItem}>
                  CALL US AT NO.20:
                </Typography>
                <Typography className={classes.contactItem}>
                  +353 (01) 672 9633
                </Typography>
                <Typography className={classes.contactItem}>
                  LINES OPEN MON-SAT
                </Typography>
                <Typography className={classes.contactItem}>
                  10AM TO 6PM
                </Typography>
                <Typography className={classes.contactItem}>
                  office@helenmcalinden.com
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className={classes.contactColumn}>
                <Typography variant="h5" className={classes.contactTitle}>
                  CUSTOMER SERVICES
                </Typography>
                <Typography className={classes.contactItem}>
                  About Us
                </Typography>
                <Typography className={classes.contactItem}>
                  Contact Us
                </Typography>
                <Typography className={classes.contactItem}>FAQ's</Typography>
                <Typography className={classes.contactItem}>
                  Delivery & Returns
                </Typography>
                <Typography className={classes.contactItem}>
                  Size Guide
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className={classes.contactColumn}>
                <Typography variant="h5" className={classes.contactTitle}>
                  LEGAL AREA
                </Typography>
                <Typography className={classes.contactItem}>
                  Terms and Conditions
                </Typography>
                <Typography className={classes.contactItem}>
                  Refund Policy
                </Typography>
                <Typography className={classes.contactItem}>
                  Privacy Policy
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
