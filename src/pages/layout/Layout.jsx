import { AppHeader } from '@/components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Layout.module.scss';
import classnames from 'classnames/bind';
import { Outlet } from 'react-router-dom';
import { useStore } from '@/store';
import { AppFooter } from '@/components';
import { Box } from '@mui/material';
import apiService from '@/api/api.service';
import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
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

export function Layout() {
  const [isAuthenticated, getCatalog] = useStore(
    useShallow((state) => [state.auth.data.isAuthenticated, state.getCatalog])
  );

  useEffect(() => {
    if (isAuthenticated) {
      getCatalog();
    }
  }, [isAuthenticated]);

  return (
    <Box className={cx('layout')}>
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
      <Box className={cx('layout__footer')}>
        <AppFooter />
      </Box>
    </Box>
  );
}
