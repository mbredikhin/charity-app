import { AppHeader } from '@/components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Layout.module.scss';
import classnames from 'classnames/bind';
import { Outlet } from 'react-router-dom';
import { useStore } from '@/store';
import { AppFooter } from '@/components';
import { Box } from '@mui/material';
const cx = classnames.bind(styles);

export function Layout() {
  const isAuthenticated = useStore((state) => state.auth.data.isAuthenticated);

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
