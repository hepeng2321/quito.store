import React, {PureComponent} from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Logo} from "./style";
import { Link } from "react-router-dom";
import {connect} from "react-redux";
import {actionCreators} from "./store";
import {actionCreators as acShop} from "../../pages/shop/store";
// import LoginDialog from "./login";
import MenuMain from "../shopHeader/menuMain";
import {Hidden} from "@mui/material";
import ShopHeader from "../shopHeader";

class Header extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      loginDialog: false,
    }
  }

  openPage = (page) => {
    this.props.setPage(page)  //设置激活页
  }

  render() {
    const {
      page,
      catListed
      // me,
      // login,
      // loginUser,
      // handleLogin,
      // handleLogout,
    } = this.props;

    // function handleLoginDo(domain, user, password) {
    //   handleLogin(domain, user, password)
    // }

    // function handleLogoutDo() {
    //   handleLogout(loginUser)
    // }

    return (
      <AppBar position="sticky" elevation={0} style={{ background: '#353535', boxShadow: 'none'}}>

        <Container maxWidth="lg">
          <Toolbar variant="dense" disableGutters>

            <Hidden mdUp>
              <MenuMain
                page={page}
                openPage={this.openPage}
              />
            </Hidden>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              <Link to="/">
                <Logo />
              </Link>
            </Typography>

            <Hidden mdDown>
              <ShopHeader
                cat={catListed}
                page={page}
                openPage={this.openPage}
              />
            </Hidden>

            {/*<Box sx={{ flexGrow: 0 }}>*/}
            {/*  <UserContentDiv>*/}

            {/*    <UserContentMenuDiv>*/}
            {/*      <MenuUser*/}
            {/*        login={login}*/}
            {/*        avatarUrl={me===null ? "" : me.get('Avatar96')}*/}
            {/*        nickname={me===null ? "" : me.get('DisplayName')}*/}
            {/*        user={me===null ? "" : me.get('Username')}*/}
            {/*        openLoginDialog={this.openLoginDialog}*/}
            {/*        handleLogout={handleLogoutDo}*/}
            {/*        userList={userList3}*/}
            {/*        shiftUser={this.shiftUser}*/}
            {/*      />*/}
            {/*    </UserContentMenuDiv>*/}

            {/*  </UserContentDiv>*/}

            {/*</Box>*/}

          </Toolbar>
        </Container>
      </AppBar>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    login: state.getIn(['header', 'login']),
    loginUser: state.getIn(['header', 'loginUser']),
    loginToken: state.getIn(['header', 'loginToken']),
    me: state.getIn(['header', 'me']),
    page: state.getIn(['shop', 'page']),
    catListed: state.getIn(['shop', 'catListed']),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogin(domain, user, password) {
      dispatch(actionCreators.loginAPI(domain, user, password));
    },
    handleLogout(user) {
      dispatch(actionCreators.logout(user));
    },
    setPage(page) {
      dispatch(acShop.setPage(page))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);