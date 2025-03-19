import { AppHeader } from '@/components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Layout.module.scss';
import classnames from 'classnames/bind';
import { Outlet, useNavigate } from 'react-router-dom';
import { useStore } from '@/store';
import { Alert, AlertTitle, Box, Button, Typography } from '@mui/material';
import apiService from '@/api/api.service';
import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { ErrorBoundary } from 'react-error-boundary';
import { routes } from '@/utils/constants';

const cx = classnames.bind(styles);

(function initApp() {
  const token = localStorage.getItem('token');
  if (token) {
    apiService.addHeader({
      name: 'Authorization',
      value: `Bearer ${token}`,
    });
    useStore.getState().setAuth({ isAuthenticated: true });
  }
})();

function fallbackRender({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <Box className={cx('fallback-render')}>
      <Alert severity="error">
        <AlertTitle>Something went wrong:</AlertTitle>
        <Typography className={cx('fallback-render__error')}>
          {error.message}
        </Typography>
        <Box className={cx('fallback-render-footer')}>
          <Button size="small" color="secondary" onClick={resetErrorBoundary}>
            Go to home page
          </Button>
        </Box>
      </Alert>
    </Box>
  );
}

export function Layout() {
  const [isAuthenticated, getCatalog] = useStore(
    useShallow((state) => [state.auth.data.isAuthenticated, state.getCatalog])
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      getCatalog();
    }
  }, [isAuthenticated]);

  return (
    <Box className={cx('layout')}>
      <ErrorBoundary
        fallbackRender={fallbackRender}
        onReset={() => navigate(routes.home())}
      >
        <Box className={cx('layout__header')}>
          <AppHeader isAuthenticated={isAuthenticated} />
        </Box>
        <Box
          className={cx({
            'layout__main-content': true,
            'layout__main-content--authenticated': isAuthenticated,
          })}
        >
          <Outlet />
          <ToastContainer />
        </Box>
      </ErrorBoundary>
    </Box>
  );
}
