import {
  AppBar,
  Box,
  Button,
  Link,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Logo from '@/assets/images/Logo.svg?react';
import { ChevronRight } from '@mui/icons-material';
import { HeaderMenu } from './HeaderMenu.jsx';
import * as pt from 'prop-types';
import { signOut } from '@/store';
import { useDispatch } from 'react-redux';

export const AppHeader = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function logout() {
    dispatch(signOut());
    navigate('/login');
  }

  return (
    <AppBar sx={{ borderRadius: 0 }} elevation={2} position="static">
      <Paper sx={{ borderRadius: 0 }} elevation={0}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '84px',
          }}
        >
          <Toolbar
            disableGutters
            sx={{
              flexGrow: 1,
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              maxWidth: '1500px',
              height: '64px',
            }}
          >
            <Box sx={{ cursor: 'pointer' }}>
              <Logo onClick={() => navigate('/profile')} />
            </Box>

            <Box display="flex" justifyContent="center">
              <Link
                underline="hover"
                color="inherit"
                component="button"
                onClick={() => navigate('/catalog')}
              >
                {isAuthenticated ? (
                  <Typography variant="body1">Запросы о помощи</Typography>
                ) : null}
              </Link>
            </Box>

            <Box display="flex" justifyContent="end">
              {isAuthenticated ? (
                <HeaderMenu onLogout={logout} />
              ) : (
                <Button
                  color="inherit"
                  variant="outlined"
                  size="large"
                  endIcon={<ChevronRight />}
                  onClick={() => navigate('/login')}
                >
                  Войти
                </Button>
              )}
            </Box>
          </Toolbar>
        </Box>
      </Paper>
    </AppBar>
  );
};

AppHeader.propTypes = {
  isAuthenticated: pt.bool,
};
