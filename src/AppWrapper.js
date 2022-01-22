import React, {PureComponent} from "react";
import {Provider} from "react-redux";
import store from './store';
import App from './App'
import {ResetStyle, GlobalStyle} from './style'
import {ThemeProvider, createTheme} from "@material-ui/core/styles";

const Theme = {
  palette: {
    primary: {
      light: '#E3F2FD',
      main: "#0FA2E6",
      dark: '#1E88E5',
      contrastText: '#fff',
    },
    secondary: {
      light: '#E3F2FD',
      main: "#0FA2E6",
      dark: '#1E88E5',
      contrastText: '#fff',
    },
    green: {
      light: '#E8F5E9',
      main: "#00C853",
      dark: '#52A856',
      contrastText: '#fff',
    },
    block: {
      light: '#FAE8EA',
      main: "#EB306F",
      dark: '#CF134B',
      contrastText: '#fff',
    },
    orange: {
      main: "#F59A23"
    },
    white: {
      main: "#FFFFFF"
    },
    blue: {
      main: "#1E88E5",
      contrastText: '#fff',
    },
    red: {
      main: "#EB306F",
    },
    login: {
      light: '#E3F2FD',
      main: "#D0E8F3",
      dark: '#D0E8F3',
      contrastText: '#fff',
    },
  }
};

const theme = createTheme(Theme);

class AppWrapper extends PureComponent {

  render() {
    return (
      <Provider store={store}>
        <ResetStyle />
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Provider>
    );
  }
}

export default AppWrapper;
