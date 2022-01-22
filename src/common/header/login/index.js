import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import {
  LoginCardContentDiv,
  LoginCardContentLoginButton,
  LoginCardContentTitleDiv,
  LoginCardContentUserTextField, LoginCardDiv
} from "../../access/login/style";
import InputAdornment from "@mui/material/InputAdornment";
import {AccountCircle} from "@mui/icons-material";
import HttpsIcon from "@mui/icons-material/Https";
import {useRef} from "react";
import {AccessCheck, AccessSize} from "../../util/access";
import {useNavigate} from "react-router-dom";

export default function LoginDialog(props) {

  const [open, setOpen] = React.useState(true);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertText, setAlertText] = React.useState("");

  const userRef = useRef();
  const pwRef = useRef();

  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    props.close();
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const login = () => {
    let user = userRef.current.value;
    if (AccessCheck(user)) {
      setAlertText("User " + user +" Already login")
      setOpenAlert(true)
    } else if (AccessSize() >= 5) {
      setAlertText("Cannot login more than 5 users")
      setOpenAlert(true)
    } else {
      props.handleLogin(props.domain, user, pwRef.current.value)
      handleClose()
      navigate("/home")
    }

  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
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
              inputRef={userRef}
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
              type="password"
              autoComplete="current-password"
              inputRef={pwRef}
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
              size="large"
              color="blue"
              onClick={login}
            >
              Login
            </LoginCardContentLoginButton>
          </LoginCardContentDiv>
        </LoginCardDiv>
      </Dialog>
      <Dialog
        open={openAlert}
        onClose={handleCloseAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <LoginCardDiv>
          <LoginCardContentDiv>
            {alertText}
          </LoginCardContentDiv>
        </LoginCardDiv>

      </Dialog>
    </div>
  );
}