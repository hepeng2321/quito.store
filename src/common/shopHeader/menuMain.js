import * as React from 'react';
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {renderMenu} from "./menuUI";
import {Drawer} from "@material-ui/core";
import Box from "@mui/material/Box";

export default function MenuMain(props) {

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  return (
    <React.Fragment>
      <IconButton
        size="medium"
        color="inherit"
        id="composition-button"
        aria-label="main menu"
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={toggleDrawer(true)}
        sx={{
          display: { xs: 'block', md: 'none' },
          width: 40, height: 40,
          color: 'white'
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor={"left"}
        open={open}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          {renderMenu(props.page, props.openPage, "menu")}
        </Box>
      </Drawer>
    </React.Fragment>
  );

}
