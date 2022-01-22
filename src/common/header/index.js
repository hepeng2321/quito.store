import React, {PureComponent} from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Logo, UserContentDiv, UserContentMenuDiv, UserContentUserListDiv} from "./style";
import { Link } from "react-router-dom";

import MenuUser from "./menuUser";
import {connect} from "react-redux";
import {actionCreators} from "./store";
// import LoginDialog from "./login";
import {AccessLoadKeyPars} from "../util/access";
import {renderUserList} from "../shopHeader/menuUI";

class Header extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      loginDialog: false,
    }
  }

  render() {
    const {
      me,
      login,
      loginUser,
      loginToken,
      domain,
      userList,
      // handleLogin,
      handleLogout,
      handleGetUserList,
    } = this.props;

    // function handleLoginDo(domain, user, password) {
    //   handleLogin(domain, user, password)
    // }

    function handleLogoutDo() {
      handleLogout(loginUser)
    }

    let keys = AccessLoadKeyPars()
    if (me !== null && keys !== null && userList.size !== keys.length) {
      handleGetUserList(loginToken, domain, keys)
    }

    let userList2 = []
    let userList3 = []
    if (userList !== undefined && userList !== null) {
      for (const item of userList) {
        if (item.get('user') !== loginUser) {
          userList2.push(item)
        }
        userList3.push(item)
      }
    }

    return (
      <AppBar position="sticky" elevation={0} style={{ background: '#353535', boxShadow: 'none'}}>

        <Container maxWidth="lg">
          <Toolbar variant="dense" disableGutters>

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

            <Box sx={{ flexGrow: 0 }}>
              <UserContentDiv>
                <UserContentUserListDiv>
                  {renderUserList(userList2, this.shiftUser)}
                </UserContentUserListDiv>

                <UserContentMenuDiv>
                  <MenuUser
                    login={login}
                    avatarUrl={me===null ? "" : me.get('Avatar96')}
                    nickname={me===null ? "" : me.get('DisplayName')}
                    user={me===null ? "" : me.get('Username')}
                    openLoginDialog={this.openLoginDialog}
                    handleLogout={handleLogoutDo}
                    userList={userList3}
                    shiftUser={this.shiftUser}
                  />
                </UserContentMenuDiv>

              </UserContentDiv>

            </Box>

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
    domain: state.getIn(['header', 'domain']),
    me: state.getIn(['header', 'me']),
    unreadUlog: state.getIn(['header', 'unreadUlog']),
    userList: state.getIn(['header', 'userList']),
    page: state.getIn(['header', 'page']),
    hasNews: state.getIn(['header', 'hasNews']),
    groupUsername: state.getIn(['group', 'groupUsername']),
    groupUserInfo: state.getIn(['group', 'groupUserInfo']),
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
    handleGetUserList(token, domain, keys) {   // 仅在刷新页面时才会调用
      dispatch(actionCreators.getUserInfoAPI(token, domain, keys));
    },
    setPage(page) {
      dispatch(actionCreators.setPage(page))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);