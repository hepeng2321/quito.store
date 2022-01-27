import React, {PureComponent} from "react";
import {Box} from "@mui/material";
import {renderMenu} from "./menuUI";

class ShopHeader extends PureComponent {

  render() {
    const {
      page,
      openPage,
    } = this.props

    return (
      <Box sx={{ flexGrow: 1, marginTop: "5px", display: 'flex' }}>
        {renderMenu(page, openPage, "shop")}
      </Box>
    )
  }
}

export default ShopHeader;