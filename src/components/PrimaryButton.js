import React from "react"
import Button from "@mui/material/Button"
import { makeStyles } from "@mui/styles"

// Define button styles using makeStyles
const useStyles = makeStyles(theme => ({
  buttonStyles: {
    background: "#8B7D9B",
    borderRadius: 30,
    height: 40,
    width: "fit-content",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 20px",
    cursor: "pointer",
    "&:hover": {
      transform: "scale(1.2)",
      transition: "transform 0.2s",
    },
    "&:disabled": {
      background: "rgba(1, 76, 64, 0.5)",
      transform: "none",
      cursor: "not-allowed",
    },
  },
}))

const PrimaryButton = ({ text, onClick, disabled = false }) => {
  const classes = useStyles()

  return (
    <Button
      className={classes.buttonStyles}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </Button>
  )
}

export default PrimaryButton
