import { navigate } from "gatsby-link"
import React, { useState } from "react"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import { makeStyles } from "@mui/styles"
import useStore from "../context/StoreContext"
import useInput from "../utils/useInput"
import PrimaryButton from "../components/PrimaryButton"

const useStyles = makeStyles(theme => ({
  backButton: {
    cursor: "pointer",
    color: theme.palette.primary.main,
    fontSize: 14,
    fontWeight: 600,
    marginLeft: theme.spacing(2),
  },
  wrapper: {
    margin: theme.spacing(4),
  },
  image: {
    width: "100%",
    height: "auto",
    borderRadius: theme.spacing(3),
  },
  infoContainer: {
    display: "grid",
    alignItems: "flex-start",
    height: "fit-content",
    gap: theme.spacing(2),
  },
  description: {
    margin: 0,
  },
  title: {
    margin: 0,
  },
  subtitle: {
    fontWeight: "bold",
    maxWidth: 500,
  },
  inputForm: {
    display: "grid",
    gridTemplateColumns: "repeat(2, auto)",
    width: "fit-content",
    gap: theme.spacing(4),
    alignItems: "center",
  },
  input: {
    borderRadius: theme.spacing(4),
    border: "2px solid rgba(0, 0, 0, 0.3)",
    padding: theme.spacing(2),
    maxWidth: 80,
    fontSize: 12,
    "&:focus": {
      outline: "none",
      outlineColor: theme.palette.primary.main,
    },
  },
  buttonContainer: {},
}))

const ProductTemplate = ({ pageContext }) => {
  const { product } = pageContext
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const { addVariantToCart } = useStore()
  const bind = useInput(1)
  const classes = useStyles()

  const prevImage = () => {
    setCurrentImageIndex(prevIndex =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    )
  }

  const nextImage = () => {
    setCurrentImageIndex(prevIndex =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    )
  }

  return (
    <Container>
      <Typography className={classes.backButton} onClick={() => navigate(-1)}>
        {"< "} Back
      </Typography>
      <Paper className={classes.wrapper}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <div className={classes.imageContainer}>
              <img
                src={product.images[currentImageIndex]?.src}
                alt={product.title}
                className={classes.image}
              />
              <div className={classes.buttonContainer}>
                <Button
                  onClick={prevImage}
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Previous
                </Button>
                <Button
                  onClick={nextImage}
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Next
                </Button>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={classes.infoContainer}>
              <Typography variant="h4" className={classes.title}>
                {product.title}
              </Typography>
              <Typography variant="h6" className={classes.subtitle}>
                {`${product.priceRangeV2.maxVariantPrice.amount}0$`}
              </Typography>
              <p className={classes.description}>{product.description}</p>
              <form className={classes.inputForm}>
                <Typography variant="subtitle1">
                  <label htmlFor="qty">Quantity:</label>
                </Typography>
                <TextField
                  id="qty"
                  variant="outlined"
                  type="number"
                  {...bind}
                  inputProps={{ className: classes.input }}
                />
              </form>
              <PrimaryButton
                text="Add to cart"
                onClick={() => addVariantToCart(product, bind.value)}
              />
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default ProductTemplate
