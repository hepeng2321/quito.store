import React, {PureComponent} from "react";
import {BrowserRouter as Router, useRoutes} from "react-router-dom";
import Home from './pages/home';
import {MyBackground} from './style'
import Header from "./common/header";
import Shop from "./pages/shop"
import Product from "./pages/product";

const AppRoute = (props) => {
  return useRoutes([
    {path: "/", element: <Home />, exact: true},
    {path: "/home", element: <Home />, exact: true},
    {path: "/shop", element: <Shop />, exact: true},
    {path: "/shop/:cat", element: <Shop />, exact: true},
    {path: "/product/:id", element: <Product />, exact: true},
  ]);
};

class App extends PureComponent {

  render() {
    return (
      <MyBackground>
        <Router>
          <Header />
          <AppRoute />
        </Router>
      </MyBackground>
    );
  }

}

export default App;
