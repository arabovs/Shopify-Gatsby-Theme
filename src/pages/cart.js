import React from "react"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import ProductRow from "../components/ProductRow"
import useStore from "../context/StoreContext"

const Cart = () => {
  const { cart, checkout } = useStore()

  const renderProductHeader = () => (
    <Grid
      container
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        marginTop: 2,
        backgroundColor: "#8B7D9B",
      }}
    >
      <Grid
        item
        xs={4}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontFamily: "Playfair Display, serif" }}
        ></Typography>
      </Grid>
      <Grid
        item
        xs={4}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontFamily: "Playfair Display, serif", color: "white" }}
        >
          Name
        </Typography>
      </Grid>
      <Grid
        item
        xs={4}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontFamily: "Playfair Display, serif", color: "white" }}
        >
          Quantity
        </Typography>
      </Grid>
      <Grid
        item
        xs={4}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontFamily: "Playfair Display, serif", color: "white" }}
        >
          Remove
        </Typography>
      </Grid>
    </Grid>
  )

  const renderCartItems = () => {
    if (cart.length > 0) {
      return cart.map((item, index) => <ProductRow key={index} item={item} />)
    } else {
      return (
        <Typography
          sx={{ fontFamily: "Playfair Display, serif" }}
          variant="body1"
        >
          Your cart is empty.
        </Typography>
      )
    }
  }

  const handleCheckout = () => {
    if (cart.length > 0) {
      window.open(checkout.webUrl)
    }
  }

  return (
    <Container maxWidth="xl" spacing={1} padding={1}>
      <Box
        sx={{
          margin: 1,
          padding: 0,
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              sx={{
                fontFamily: "Playfair Display, serif",
              }}
            >
              My Cart
            </Typography>
          </Grid>
          {renderProductHeader()}
          {renderCartItems()}
          <Grid item xs={12}>
            <div
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 4,
              }}
            ></div>
          </Grid>
        </Grid>
        <Container>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: 2,
              marginBottom: 2,
            }}
          >
            {/* <Button
              onClick={handleCheckout}
              disabled={cart.length === 0}
              sx={{
                backgroundColor: "darkgrey",
                color: "white",
                fontSize: "22px",
                fontFamily: "Playfair Display, serif",
              }}
            >
              Clear Basket
            </Button> */}
            <Button
              onClick={handleCheckout}
              disabled={cart.length === 0}
              sx={{
                backgroundColor: "#8B7D9B",
                color: "white",
                fontSize: "22px",
                fontFamily: "Playfair Display, serif",
              }}
            >
              Buy Now
            </Button>
          </Box>
          {/* <Box
            sx={{ backgroundColor: "#8B7D9B", padding: 1, marginTop: 1 }}
          ></Box> */}
          <Typography
            sx={{
              fontSize: "22px",
              fontFamily: "Playfair Display, serif",
            }}
          >
            At The Art in Lounge, we take great pride in ensuring that your
            orders are not just stylish, but also meticulously packaged and
            promptly sent to your doorstep. Our dedicated team of artisans pays
            close attention to detail, carefully wrapping each item with the
            utmost care to preserve its beauty. We understand the anticipation
            of receiving your fashion treasures, and we strive to dispatch your
            order swiftly, so you can enjoy your new pieces in no time. Your
            satisfaction is our priority, and we guarantee a seamless shopping
            experience from checkout to delivery.
          </Typography>
          {/* <Box sx={{ backgroundColor: "#8B7D9B", padding: 1 }}></Box> */}
        </Container>
        {/* <Box
          sx={{ backgroundColor: "#8B7D9B", padding: 1, marginTop: 1 }}
        ></Box> */}
      </Box>
    </Container>
  )
}

export default Cart
