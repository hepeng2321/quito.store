import React from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import {RenderAvatar} from "../util/avatar";
import {UserIcon, StyledBadge} from "../header/style";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import {fashion, suit, shoes, accessories, pajamas, cosmetic} from "../util/category";
import {Divider, ListItemIcon} from "@material-ui/core";
import HomeIcon from '@mui/icons-material/Home';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

function activeMenu(page, openPage) {
  return (
    <Button onClick={() => openPage(page)}
            sx={{borderRadius: "0", fontWeight: "800",
              color: '#0FA2E6', display: 'block',
              textTransform: 'none', marginLeft: '5px' }}>
      {page}
    </Button>
  )
}

function inactiveMenu(page, openPage) {
  return (
    <Button onClick={() => openPage(page)}
            sx={{borderRadius: "0", fontWeight: "550",
              color: '#666', display: 'block',
              textTransform: 'none', marginLeft: '5px' }}>
      {page}
    </Button>
  )
}

function activeMenuItem(page) {
  return (
    <React.Fragment>
      <Typography variant="inherit" noWrap sx={{fontWeight: "600", color: "#0FA2E6"}}>
        {page}
      </Typography>
    </React.Fragment>
  )
}

function inactiveMenuItem(page) {
  return (
    <Typography variant="inherit" noWrap sx={{fontWeight: "550", color: "#666"}} >
      {page}
    </Typography>
  )
}

export function renderMenu(page, openPage, t) {
  if (t === "menu") {
    return (
      <MenuList>
        <Link to={"/"}>
          <MenuItem
            key={"home"}
            onClick={() => openPage("home")}
            sx={{height: "40px"}}
          >
            <ListItemIcon>
              {page === "home" ? <HomeIcon color="primary" /> : <HomeIcon/>}
            </ListItemIcon>
            {
              page === "home" ?
                activeMenuItem("Home") :
                inactiveMenuItem("Home")
            }
          </MenuItem>
        </Link>
        <Divider />
        <Link to={"/shop/fashion"}>
          <MenuItem
            key={"list"}
            onClick={() => openPage(fashion)}
            sx={{height: "40px"}}
          >
            <ListItemIcon>
              <FormatListBulletedIcon />
            </ListItemIcon>
            {inactiveMenuItem("Category")}
          </MenuItem>
        </Link>
        <Link to={"/shop/fashion"}>
          <MenuItem
            key={fashion}
            onClick={() => openPage(fashion)}
            dense={true}
            sx={{paddingLeft: "30px"}}
          >
            {
              page === fashion ?
              activeMenuItem(fashion) :
              inactiveMenuItem(fashion)
            }
          </MenuItem>
        </Link>
        <Link to={"/shop/suit"}>
          <MenuItem
            key={suit}
            onClick={() => openPage(suit)}
            dense={true}
            sx={{paddingLeft: "30px", marginTop: "5px"}}
          >
            {
              page === suit ?
                activeMenuItem(suit) :
                inactiveMenuItem(suit)
            }
          </MenuItem>
        </Link>
        <Link to={"/shop/shoes"}>
          <MenuItem
            key={shoes}
            onClick={() => openPage(shoes)}
            dense={true}
            sx={{paddingLeft: "30px", marginTop: "5px"}}
          >
            {
              page === shoes ?
              activeMenuItem(shoes) :
              inactiveMenuItem(shoes)
            }
          </MenuItem>
        </Link>
        <Link to={"/shop/accessories"}>
          <MenuItem
            key={accessories}
            onClick={() => openPage(accessories)}
            dense={true}
            sx={{paddingLeft: "30px", marginTop: "5px"}}
          >
            {
              page === accessories ?
                activeMenuItem(accessories) :
                inactiveMenuItem(accessories)
            }
          </MenuItem>
        </Link>
        <Link to={"/shop/pajamas"}>
          <MenuItem
            key={pajamas}
            onClick={() => openPage(pajamas)}
            dense={true}
            sx={{paddingLeft: "30px", marginTop: "5px"}}
          >
            {
              page === pajamas ?
                activeMenuItem(pajamas) :
                inactiveMenuItem(pajamas)
            }
          </MenuItem>
        </Link>
        <Link to={"/shop/cosmetic"}>
          <MenuItem
            key={cosmetic}
            onClick={() => openPage(cosmetic)}
            dense={true}
            sx={{paddingLeft: "30px", marginTop: "5px", marginBottom: "5px"}}
          >
            {
              page === cosmetic ?
                activeMenuItem(cosmetic) :
                inactiveMenuItem(cosmetic)
            }
          </MenuItem>
        </Link>
        <Divider />
        <Link to={"/"}>
          <MenuItem
            key={"location"}
          >
            <ListItemIcon>
              <LocationOnIcon />
            </ListItemIcon>
            {inactiveMenuItem("Location")}
          </MenuItem>
        </Link>
        <Link to={"/"}>
          <MenuItem
            key={"contact"}
          >
            <ListItemIcon>
              <WhatsAppIcon />
            </ListItemIcon>
            {inactiveMenuItem("Contact")}
          </MenuItem>
        </Link>
      </MenuList>
    )
  } else {
    return (
      <React.Fragment>
        <Link to={"/shop/fashion"}>
          {
            page === fashion ?
              activeMenu(fashion, openPage) :
              inactiveMenu(fashion, openPage)
          }
        </Link>
        <Link to={"/shop/suit"}>
          {
            page === suit ?
              activeMenu(suit, openPage) :
              inactiveMenu(suit, openPage)
          }
        </Link>
        <Link to={"/shop/shoes"}>
          {
            page === shoes ?
              activeMenu(shoes, openPage) :
              inactiveMenu(shoes, openPage)
          }
        </Link>
        <Link to={"/shop/accessories"}>
          {
              page === accessories ?
                activeMenu(accessories, openPage) :
                inactiveMenu(accessories, openPage)
          }
        </Link>
        <Link to={"/shop/pajamas"}>
          {
              page === pajamas ?
                activeMenu(pajamas, openPage) :
                inactiveMenu(pajamas, openPage)
          }
        </Link>
        <Link to={"/shop/cosmetic"}>
          {
            page === cosmetic ?
                activeMenu(cosmetic, openPage) :
                inactiveMenu(cosmetic, openPage)
          }
        </Link>
      </React.Fragment>
    )
  }

}

function renderAvatar(item) {
  if (item.get('unreadUlog') > 0) {
    return (
      <StyledBadge badgeContent={item.get('unreadUlog')} color="secondary" max={99}>
        <UserIcon>
          {RenderAvatar(
            item.getIn(['userInfo', 'Avatar96']),
            item.getIn(['userInfo', 'DisplayName']),
            22, "10px", "0", "0", "1px solid #fff", "pointer", false)}
        </UserIcon>
      </StyledBadge>
    )
  } else {
    return (
      <UserIcon>
        {RenderAvatar(
          item.getIn(['userInfo', 'Avatar96']),
          item.getIn(['userInfo', 'DisplayName']),
          22, "10px", "0", "0", "1px solid #fff", "pointer", false)}
      </UserIcon>
    )
  }

}

export function renderUserList(userList, shiftUser) {
  return (
    userList.map((item, index) => {
      const user = item.getIn(['userInfo', 'Username'])
      return (
        <div key={user}>
          <IconButton onClick={() => shiftUser(user)}
                      id={"user-"+user}
                      sx={{margin: "8px 2px 0 0"}}
          >
            {renderAvatar(item)}
          </IconButton>
        </div>
      )
    })
  )

}
