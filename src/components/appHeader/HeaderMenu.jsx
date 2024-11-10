import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import { useRef, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import * as pt from 'prop-types';
import { routes } from '@/utils/constants';

export const HeaderMenu = ({ onLogout }) => {
  const menuActivator = useRef(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const onActivatorClick = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const goTo = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <div>
      <IconButton
        ref={menuActivator}
        size="small"
        color="inherit"
        onClick={onActivatorClick}
      >
        <Avatar />
      </IconButton>
      <Menu
        anchorEl={menuActivator?.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => goTo(routes.profile())}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText>Мой профиль</ListItemText>
        </MenuItem>
        <MenuItem onClick={onLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText>Выйти</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};

HeaderMenu.propTypes = {
  onLogout: pt.func,
};
