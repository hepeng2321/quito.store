import * as React from 'react';
import MenuList from '@mui/material/MenuList';

import Paper from "@mui/material/Paper";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import Popper from "@mui/material/Popper";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {renderMenu} from "./menuUI";

export default function MenuMain(props) {

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
    <React.Fragment>
      <IconButton
        size="medium"
        color="inherit"
        ref={anchorRef}
        id="composition-button"
        aria-label="main menu"
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        sx={{
          display: { xs: 'block', md: 'none' },
          width: 40, height: 40,
          color: '#0FA2E6'
        }}
      >
        <MenuIcon />
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          // keepMounted
          disablePortal
        >
          <Paper sx={{background: "white", minWidth: "180px", maxWidth: "300px"}}>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList
                id="composition-menu"
                aria-labelledby="composition-button"
                onKeyDown={handleListKeyDown}
              >
                {renderMenu(props.page, props.openPage, "menu")}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Popper>
      </IconButton>
    </React.Fragment>
  );

}
