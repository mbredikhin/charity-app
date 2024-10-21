import { Outlet } from 'react-router-dom';
import { AppHeader } from '@/components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Layout.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

export function Layout() {
  return (
    <div className={cx(['layout'])}>
      <ToastContainer />
      <AppHeader />
      <main className={cx(['layout-main'])}>
        <Outlet />
      </main>
    </div>
  );
}
