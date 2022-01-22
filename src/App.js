import React, {PureComponent} from "react";
import {connect} from "react-redux";
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
    // {path: "/group/:group", element: <Group setShowHeader={setShowHeader} />, exact: true},
    // {path: "/profile/:user", element: <Profile setShowHeader={setShowHeader} />, exact: true},
    // {path: "/profile", element: <Profile setShowHeader={setShowHeader} />, exact: true},
    // {path: "/notification", element: <Notification />, exact: true},
    // {path: "/explore", element: <Explore />, exact: true},
    // {path: "/bookmark", element: <Bookmark />, exact: true},
    // {path: "/search", element: <Search />, exact: true},
    // {path: "/post/:postId", element: <Post />, exact: true},
    // {path: "/test", element: <MyList />, exact: true},
    // {path: "/test2", element: <MyEditor />, exact: true},
    // {path: "/test3", element: <SimpleCollapse />, exact: true},
    // {path: "/test4", element: <BasicGrid />, exact: true},
  ]);
};

class App extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      loginUser: "",
    }

  }

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

const mapStateToProps = (state) => {
  return {
    loginUser: state.getIn(['header', 'loginUser']),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
