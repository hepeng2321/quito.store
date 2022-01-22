import React, {createRef, PureComponent} from 'react'
import {connect} from "react-redux";
import {actionCreators} from "../../header/store";
import InputAdornment from '@mui/material/InputAdornment';
import HttpsIcon from '@mui/icons-material/Https';
import {AccountCircle} from "@mui/icons-material";

import {
  LoginCardDiv,
  LoginCardContentDiv,
  LoginCardContentTitleDiv,
  LoginCardContentUserTextField,
  LoginCardContentLoginButton
} from "./style";

class Login extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      loginStatus: false
    }
    this.textRef = createRef();
    this.pwRef = createRef();
  }

  login = () => {
    const {
      domain,
      handleLogin,
    } = this.props;
    handleLogin(domain, this.textRef.current.value, this.pwRef.current.value)
  };

  enterLogin = () => {
    this.setState({
      loginStatus: true
    });
  };

  render() {
    const {
      login,
      loginUser
    } = this.props;

    const {
      loginStatus
    } = this.state;

    if (loginUser === "") {
      return null
    } else if (!login && !loginStatus) {
      return (
        <LoginCardDiv>
          <LoginCardContentDiv>
            <LoginCardContentLoginButton
              variant="contained"
              size="middle"
              color="blue"
              onClick={this.enterLogin}
            >
              Login to Vogger
            </LoginCardContentLoginButton>
          </LoginCardContentDiv>
        </LoginCardDiv>
      )
    } else if (!login && loginStatus) {
      return (
        <LoginCardDiv>
          <LoginCardContentDiv>
            <LoginCardContentTitleDiv>
              Login to Vogger
            </LoginCardContentTitleDiv>
            <LoginCardContentUserTextField
              id="login-user"
              aria-label="login user"
              placeholder="Username or Email"
              size={"small"}
              inputRef={this.textRef}
              autoFocus={true}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <LoginCardContentUserTextField
              id="login-password"
              aria-label="login password"
              placeholder="Password"
              size={"small"}
              // label="Password"
              type="password"
              autoComplete="current-password"
              inputRef={this.pwRef}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <HttpsIcon />
                  </InputAdornment>
                ),
              }}
            />
            <LoginCardContentLoginButton
              variant="contained"
              size="middle"
              color="blue"
              // disableElevation
              onClick={this.login}
            >
              Login
            </LoginCardContentLoginButton>
          </LoginCardContentDiv>
        </LoginCardDiv>
      )
    }

  }
}

const mapStateToProps = (state) => {
  return {
    login: state.getIn(['header', 'login']),
    loginUser: state.getIn(['header', 'loginUser']),
    domain: state.getIn(['header', 'domain']),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogin(domain, user, password) {
      dispatch(actionCreators.loginAPI(domain, user, password));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);