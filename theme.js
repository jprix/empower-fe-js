// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#e0ac47",
    },
    secondary: {
      main: "#e6d193",
    },
    background: {
      default: "#e6d193",
    },
    text: {
      primary: "#5c4f3c",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label.Mui-focused": {
            color: "#e0ac47",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "#e0ac47",
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#e0ac47",
            },
          },
        },
      },
    },
  },
});

export default theme;
