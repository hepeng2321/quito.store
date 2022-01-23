import React, {PureComponent} from "react";
import {AppBar} from "@mui/material";
import {Container} from "@mui/material";
import {Toolbar} from "@mui/material";
import {Box} from "@mui/material";
import {renderMenu} from "./menuUI";

class ShopHeader extends PureComponent {

  render() {
    const {
      page,
      openPage,
    } = this.props
    return (
      <AppBar position="sticky"
              elevation={0}
              style={{ background: 'rgba(255,255,255,0.8)', boxShadow: 'none', borderBottom: '1px solid #eee'}}>
        <Container maxWidth="lg">
          <Toolbar variant="dense" disableGutters>

            <Box sx={{ flexGrow: 1, marginTop: "5px", display: 'flex' }}>
              {renderMenu(page, openPage, "shop")}
            </Box>

            {/*<Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'flex', md: 'none'} }}>*/}
            {/*  <MenuMain*/}
            {/*    page={page}*/}
            {/*    openPage={openPage}*/}
            {/*  />*/}
            {/*</Box>*/}

          </Toolbar>
        </Container>
      </AppBar>
    )
  }
}

export default ShopHeader;