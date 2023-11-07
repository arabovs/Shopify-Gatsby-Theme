import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    primary: {
      main: "#007ACC", // Set your primary color
    },
    secondary: {
      main: "#FF6F61", // Set your secondary color
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1280,
      xl: 1920,
      myBreakpoint: 940, // Custom breakpoint
    },
  },
})

export default theme
