import { useStore } from '@/store';
import { Accounts, LoginForm } from '@/components';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/utils/constants';
import { useEffect } from 'react';
import { LoginCredentials } from '@/types';
import { Box } from '@mui/material';
import styles from './Login.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

export function Login() {
  const {
    data: { isAuthenticated },
    loading,
    error,
  } = useStore((state) => state.auth);
  const login = useStore((state) => state.login);
  const resetError = useStore((state) => state.resetError);
  const navigate = useNavigate();

  function onInput() {
    resetError();
  }

  async function onSubmit(credentials: LoginCredentials) {
    await login(credentials);
    navigate(routes.profile());
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.profile());
    }
  }, []);

  return (
    <Box className={cx(['login'])}>
      <Box
        component="section"
        className={cx(['login-section', 'login-section--bordered'])}
      >
        <LoginForm
          loading={loading}
          error={error}
          onInput={onInput}
          onSubmit={onSubmit}
        />
      </Box>
      <Box component="section" className={cx(['login-section'])}>
        <Accounts />
      </Box>
    </Box>
  );
}
