import {
  AppBar,
  Box,
  Button,
  Link,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '@/assets/images/Logo.svg?react';
import { ChevronRight } from '@mui/icons-material';
import { AppHeaderMenu } from './AppHeaderMenu';
import { useStore } from '@/store';
import { routes } from '@/utils/constants';
import styles from './AppHeader.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

interface AppHeaderProps {
  isAuthenticated: boolean;
}

export function AppHeader({ isAuthenticated }: AppHeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const signOut = useStore((state) => state.signOut);

  async function logout() {
    signOut();
    navigate(routes.login());
  }

  return (
    <AppBar className={cx(['app-header'])} elevation={2} position="static">
      <Paper className={cx(['paper'])} elevation={0}>
        <Box className={cx(['content'])}>
          <Toolbar className={cx(['toolbar'])} disableGutters>
            <Box className={cx(['logo'])}>
              <Logo onClick={() => navigate(routes.profile())} />
            </Box>

            <Box className={cx(['wrapper', 'wrapper--content-center'])}>
              <Link
                underline="hover"
                color="inherit"
                component="button"
                onClick={() => navigate(routes.catalog())}
              >
                {isAuthenticated ? (
                  <Typography variant="body1">Запросы о помощи</Typography>
                ) : null}
              </Link>
            </Box>

            <Box className={cx(['wrapper', 'wrapper--content-end'])}>
              {isAuthenticated ? (
                <AppHeaderMenu onLogout={logout} />
              ) : location.pathname === routes.login() ? null : (
                <Button
                  color="inherit"
                  variant="outlined"
                  size="large"
                  endIcon={<ChevronRight />}
                  onClick={() => navigate(routes.login())}
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
}
