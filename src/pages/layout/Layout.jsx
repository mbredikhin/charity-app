import { AppHeader } from '@/components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Layout.module.scss';
import classnames from 'classnames/bind';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateIsAuthenticated } from '@/store';
import apiService from '@/api/api.service';
import { AppFooter } from '@/components';
import { Box } from '@mui/material';
const cx = classnames.bind(styles);

export function Layout() {
  const isAuthenticated = useSelector(
    (state) => state.authorization.isAuthenticated
  );
  const dispatch = useDispatch();

  const token = localStorage.getItem('token');
  if (token) {
    apiService.addHeader({
      name: 'Authorization',
      value: `Bearer ${token}`,
    });
    dispatch(updateIsAuthenticated(true));
  }

  return (
    <Box className={cx('layout')}>
      <Box className={cx('layout__header')}>
        <AppHeader isAuthenticated={isAuthenticated} />
      </Box>
      <Box
        className={cx({
          'layout__main-content': true,
          'layout__main-content--authorized': isAuthenticated,
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
