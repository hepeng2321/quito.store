import * as React from 'react';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import Paper from "@mui/material/Paper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Popper from "@mui/material/Popper";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import {Divider, ListItemText} from "@material-ui/core";
import {Check} from "@mui/icons-material";
import GuestImg from "../../statics/avatar_96.png";
import {RenderAvatar} from "../util/avatar";
import MenuSettingIcon from "../icons/menuSetting";
import MenuLoginIcon from "../icons/menuLogin";
import MenuLogoutIcon from "../icons/menuLogout";


// function renderProfile(props) {
//   return (
//     <MenuItem>
//       <ListItemIcon>
//         <MenuProfileIcon />
//       </ListItemIcon>
//       <Typography key={"block"} variant="inherit" noWrap>Profile</Typography>
//     </MenuItem>
//   )
// }

function renderSetting(props) {
  return (
    <MenuItem sx={{height: "40px"}}>
      <ListItemIcon>
        <MenuSettingIcon />
      </ListItemIcon>
      <Typography key={"bookmark"} variant="inherit" noWrap>Setting</Typography>
    </MenuItem>
  )
}

function renderUserList(props) {
  return (
    props.userList.map((item, index) => {
      let user = item.getIn(['userInfo', 'Username'])
      let avatar = item.getIn(['userInfo', 'Avatar96'])
      let nickname = item.getIn(['userInfo', 'DisplayName'])
      return <MenuItem key={user} onClick={() => props.shiftUser(user)} sx={{height: "40px"}}>
        <ListItemIcon>
          {RenderAvatar(avatar, nickname, 22, "9px", "0", "0", "1px solid #fff", "pointer", true)}
        </ListItemIcon>
        <ListItemText key={"report"}>
          <Typography variant="inherit" noWrap sx={{float: 'left', maxWidth: "215px"}}>{nickname}</Typography>
        </ListItemText>
        <Typography variant="body2" color="text.secondary">
          {user === props.user ? <Check fontSize="small"/> : undefined}
        </Typography>
      </MenuItem>
    })
  )
}

function renderLogin(props) {
  if (props.userList.length > 0) {
    return (
      <MenuItem onClick={props.openLoginDialog} sx={{height: "40px"}}>
        <ListItemIcon>
          <MenuLoginIcon />
        </ListItemIcon>
        <Typography key={"report"} variant="inherit" noWrap>Login another user</Typography>
      </MenuItem>
    )
  } else {
    return (
      <MenuItem onClick={props.openLoginDialog} sx={{height: "40px"}}>
        <ListItemIcon>
          <MenuLoginIcon />
        </ListItemIcon>
        <Typography key={"report"} variant="inherit" noWrap>Login</Typography>
      </MenuItem>
    )
  }
}

function renderLogout(props) {
  return (
    <MenuItem onClick={props.handleLogout} sx={{height: "40px"}}>
      <ListItemIcon>
        <MenuLogoutIcon />
      </ListItemIcon>
      <Typography key={"report"} variant="inherit" noWrap>Logout {props.nickname}</Typography>
    </MenuItem>
  )
}

export default function MenuUser(props) {

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);


  return (
    <IconButton
      ref={anchorRef}
      id="user-button"
      aria-controls={open ? 'user-menu' : undefined}
      aria-expanded={open ? 'true' : undefined}
      aria-haspopup="true"
      onClick={handleToggle}
    >
      {props.user === "" ? null : (props.nickname === "guest" ?
        <Avatar alt="Guest" src={GuestImg} sx={{ width: 30, height: 30}}/> :
        RenderAvatar(props.avatarUrl, props.nickname, 30, "13px", "0", "0", "1px solid #fff", "pointer", false))
      }
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-end"
        disablePortal
      >
        <Paper sx={{background: "white", minWidth: "200px", maxWidth: "300px"}}>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList
              // autoFocusItem={open}
              id="composition-menu"
              aria-labelledby="composition-button"
              onKeyDown={handleListKeyDown}
            >
              {renderUserList(props)}
              {renderLogin(props)}
              {props.login ? <Divider />: null}
              {props.login ? renderSetting(props): null}
              {props.login ? <Divider />: null}
              {props.login ? renderLogout(props): null}
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </IconButton>
  );

}
