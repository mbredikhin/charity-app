import { Outlet } from 'react-router-dom';
import { AppHeader } from '@/components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Layout.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

export function Layout() {
  const isAuthenticated = true;

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
      <div className={cx(['layout__footer'])}>Footer is here</div>
    </div>
  );
}
