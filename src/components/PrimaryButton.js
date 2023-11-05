import React from "react"
import Button from "@mui/material/Button"

// Define a reusable button component with customization options
const PrimaryButton = ({ text, onClick, disabled = false }) => {
  // Define button styles
  const buttonStyles = {
    background: "#014c40",
    borderRadius: 30,
    height: 40,
    width: "fit-content",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 20px",
    cursor: "pointer",
  }

  // Define hover styles
  const hoverStyles = {
    transform: "scale(1.2)",
    transition: "transform 0.2s",
  }

  // Define disabled styles
  const disabledStyles = {
    background: "rgba(1, 76, 64, 0.5)",
    transform: "none",
    cursor: "not-allowed",
  }

  return (
    // Use the Material-UI Button component with customized styles
    <Button
      style={buttonStyles}
      onClick={onClick}
      disabled={disabled}
      sx={{
        "&:hover": hoverStyles,
        "&:disabled": disabledStyles,
      }}
    >
      {text}
    </Button>
  )
}

export default PrimaryButton
