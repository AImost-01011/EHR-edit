import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#6a5acd",
      contrastText: "#fff",
    },
    secondary: {
      main: "#d70035",
    },
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: "Noto Sans JP, sans-serif",
  },
});

export default theme;
