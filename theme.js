import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#e8c14a",
      light: "#f0d070",
      dark: "#c9a83c",
    },
    secondary: {
      main: "#f9f4e8",
    },
    background: {
      default: "#0d1f3c",
      paper: "#142850",
    },
    text: {
      primary: "#f9f4e8",
      secondary: "#8a9bb5",
    },
  },
  typography: {
    fontFamily: "'DM Sans', sans-serif",
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label": { color: "#8a9bb5" },
          "& label.Mui-focused": { color: "#e8c14a" },
          "& .MuiOutlinedInput-root": {
            color: "#f9f4e8",
            "& fieldset": { borderColor: "rgba(232,193,74,0.2)" },
            "&:hover fieldset": { borderColor: "rgba(232,193,74,0.4)" },
            "&.Mui-focused fieldset": { borderColor: "#e8c14a" },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "'DM Sans', sans-serif",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#0d1f3c",
          color: "#f9f4e8",
        },
      },
    },
  },
});

export default theme;
