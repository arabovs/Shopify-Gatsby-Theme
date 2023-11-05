import React from "react"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"

import useStore from "../context/StoreContext"

const ProductRow = ({ item }) => {
  const { removeLineItem } = useStore()
  const { quantity, product } = item

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={2}>
        <img
          src={product.images[0]?.src}
          alt={product.title}
          style={{
            width: "80px",
            height: "80px",
            objectFit: "cover",
            borderRadius: "4px",
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h6" style={{ fontWeight: 700 }}>
          {product.title}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="subtitle1">{product.quantity}</Typography>
      </Grid>
      <Grid item xs={2}>
        <IconButton
          color="secondary"
          onClick={() => removeLineItem(product.variants[0]?.shopifyId)}
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default ProductRow
