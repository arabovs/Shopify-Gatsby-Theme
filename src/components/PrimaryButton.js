import React from "react"
import Button from "@mui/material/Button"

const PrimaryButton = ({ text, onClick, disabled = false }) => {
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

  const hoverStyles = {
    transform: "scale(1.2)",
    transition: "0.2s",
  }

  const disabledStyles = {
    background: "rgba(1, 76, 64, 0.5)",
    transform: "none",
    cursor: "not-allowed",
  }

  return (
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
