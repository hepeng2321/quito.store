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
        <Link to={"/shop/fashion"}>
          <MenuItem
            key={fashion}
            onClick={() => openPage(fashion)}
            sx={{height: "40px"}}
          >
            {/*<ListItemIcon>*/}
            {/*  {page === fashion ? <HomeIcon color="primary" /> : <HomeIcon/>}*/}
            {/*</ListItemIcon>*/}
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
            sx={{height: "40px"}}
          >
            {/*<ListItemIcon>*/}
            {/*  {*/}
            {/*    page === suit ?*/}
            {/*      <NotificationsIcon color="primary" /> :*/}
            {/*      <NotificationsIcon/>*/}
            {/*  }*/}
            {/*</ListItemIcon>*/}
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
            sx={{height: "40px"}}
          >
            {/*<ListItemIcon>*/}
            {/*  {*/}
            {/*    page === shoes ?*/}
            {/*    <LocalFireDepartmentIcon color="primary" /> :*/}
            {/*    <LocalFireDepartmentIcon/>*/}
            {/*  }*/}
            {/*</ListItemIcon>*/}
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
            sx={{height: "40px"}}
          >
            {/*<ListItemIcon>*/}
            {/*  {*/}
            {/*    page === accessories ?*/}
            {/*      <PersonIcon color="primary" /> :*/}
            {/*      <PersonIcon/>*/}
            {/*  }*/}
            {/*</ListItemIcon>*/}
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
            sx={{height: "40px"}}
          >
            {/*<ListItemIcon>*/}
            {/*  {*/}
            {/*    page === pajamas ?*/}
            {/*      <BookmarkBorderIcon color="primary" /> :*/}
            {/*      <BookmarkBorderIcon/>*/}
            {/*  }*/}
            {/*</ListItemIcon>*/}
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
            sx={{height: "40px"}}
          >
            {/*<ListItemIcon>*/}
            {/*  {*/}
            {/*    page === cosmetic ?*/}
            {/*      <SearchIcon color="primary" /> :*/}
            {/*      <SearchIcon/>*/}
            {/*  }*/}
            {/*</ListItemIcon>*/}
            {
              page === cosmetic ?
                activeMenuItem(cosmetic) :
                inactiveMenuItem(cosmetic)
            }
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
