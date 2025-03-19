import {
  Box,
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
import { routes } from '@/utils/constants';

interface MenuItem {
  text: string;
  icon: JSX.Element;
  onClick: () => void;
}

interface AppHeaderMenuProps {
  onLogout: () => void;
}

export function AppHeaderMenu({ onLogout }: AppHeaderMenuProps) {
  const menuActivator = useRef(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const menuItems: MenuItem[] = [
    {
      text: 'Мой профиль',
      icon: <PersonIcon />,
      onClick: openProfile,
    },
    {
      text: 'Выйти',
      icon: <LogoutIcon />,
      onClick: onLogout,
    },
  ];

  function toggle() {
    setOpen(!open);
  }

  function close() {
    setOpen(false);
  }

  function openProfile() {
    setOpen(false);
    navigate(routes.profile());
  }

  return (
    <Box>
      <IconButton
        ref={menuActivator}
        size="small"
        color="inherit"
        onClick={toggle}
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
        onClose={close}
      >
        {menuItems.map(({ text, icon, onClick }) => (
          <MenuItem key={text} onClick={onClick}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText>{text}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
