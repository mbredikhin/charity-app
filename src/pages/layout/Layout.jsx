import { AppHeader } from '@/components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Layout.module.scss';
import classnames from 'classnames/bind';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { updateIsAuthenticated } from '@/store';
import apiService from '@/api/api.service';
import { AppFooter } from '@/components';
const cx = classnames.bind(styles);

export function Layout() {
  const isAuthenticated = useSelector(
    (state) => state.authorization.isAuthenticated
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      apiService.addHeader({
        name: 'Authorization',
        value: `Bearer ${token}`,
      });
      dispatch(updateIsAuthenticated(true));
      navigate('/profile');
    }
  }, [dispatch, navigate]);

  return (
    <div className={cx(['layout'])}>
      <div className={cx(['layout__header'])}>
        <AppHeader isAuthenticated={isAuthenticated} />
      </div>
      <main
        className={cx([
          'layout__main-content',
          isAuthenticated ? 'layout__main-content--authorized' : null,
        ])}
      >
        <Outlet />
        <ToastContainer />
      </main>
      <div className={cx(['layout__footer'])}>
        <AppFooter />
      </div>
    </div>
  );
}
