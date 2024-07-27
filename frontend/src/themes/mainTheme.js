import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#212529",
    },
    secondary: {
      main: "##f1f3f5",
    },
    info: {
      main: "#ae3ec9",
    },
    background: {
      default: "##f1f3f5",
    },
    text: {
      primary: "#212529",
    },
  },
});

export default theme;
