import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SettingsIcon from '@mui/icons-material/Settings';

export default function AdminMenu(props) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const {
    handleChangeMenu
  } = props

  return (
    <List
      sx={{
        width: '100%', height: '100%', bgcolor: 'background.paper',
        '& .MuiListItemIcon-root': {minWidth: '42px'}
      }}
      component="nav"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader" sx={{height: '30px', lineHeight: '40px'}}>
          Main Menu
        </ListSubheader>
      }
    >

      <ListItemButton onClick={()=>handleChangeMenu('Product')}>
        <ListItemIcon>
          <CheckroomIcon />
        </ListItemIcon>
        <ListItemText primary="Product" />
      </ListItemButton>

      <ListItemButton onClick={()=>handleChangeMenu('Inbound')}>
        <ListItemIcon>
          <AddBusinessIcon />
        </ListItemIcon>
        <ListItemText primary="Inbound" />
      </ListItemButton>

      <ListItemButton onClick={()=>handleChangeMenu('Outbound')}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Outbound" />
      </ListItemButton>

      <ListItemButton onClick={()=>handleChangeMenu('Stock')}>
        <ListItemIcon>
          <StorefrontIcon />
        </ListItemIcon>
        <ListItemText primary="Stock" />
      </ListItemButton>

      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Setting" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding dense>

          <ListItemButton sx={{ pl: 4 }}  onClick={()=>handleChangeMenu('Category')}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Category" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }} onClick={()=>handleChangeMenu('Size')}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Size" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }} onClick={()=>handleChangeMenu('Recommend')}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Recommend" />
          </ListItemButton>

          {/*<ListItemButton sx={{ pl: 4 }} onClick={()=>handleChangeMenu('Picture')}>*/}
          {/*  <ListItemIcon>*/}
          {/*    <StarBorder />*/}
          {/*  </ListItemIcon>*/}
          {/*  <ListItemText primary="Picture" />*/}
          {/*</ListItemButton>*/}

        </List>
      </Collapse>
    </List>
  );
}