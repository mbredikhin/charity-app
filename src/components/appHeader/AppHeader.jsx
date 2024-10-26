import {
  AppBar,
  Box,
  Button,
  IconButton,
  Link,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Logo from '@/assets/images/logo.svg?react';
import { ChevronRight } from '@mui/icons-material';
import { HeaderMenu } from './HeaderMenu.jsx';
import * as pt from 'prop-types';

export const AppHeader = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  function logout() {
    // TODO: Add logout logic
  }

  return (
    <AppBar position="static">
      <Paper elevation={2}>
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
            <Box>
              <IconButton
                size="small"
                color="inherit"
                onClick={() => navigate('/')}
              >
                <Logo />
              </IconButton>
            </Box>

            <Box display="flex" justifyContent="center">
              <Link
                underline="hover"
                color="inherit"
                component="button"
                onClick={() => navigate('/catalog')}
              >
                <Typography variant="body1">Запросы о помощи</Typography>
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
                  onClick={() => navigate('/sign-in')}
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
