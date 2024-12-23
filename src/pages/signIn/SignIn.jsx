import { useStore } from '@/store';
import { Accounts, AuthForm } from '@/components';
import styles from './SignIn.module.scss';
import classnames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/utils/constants';
import { useEffect } from 'react';
const cx = classnames.bind(styles);

export function SignIn() {
  const signIn = useStore((state) => state.signIn);
  const isAuthenticated = useStore((state) => state.auth.data.isAuthenticated);
  const error = useStore((state) => state.auth.error);
  const loading = useStore((state) => state.auth.loading);
  const navigate = useNavigate();

  async function login(credentials) {
    await signIn(credentials);
    navigate(routes.profile());
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.profile());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cx(['main-content'])}>
      <section className={cx(['main-content__authForm'])}>
        <AuthForm
          loading={loading}
          error={error?.code === 'ERR_BAD_REQUEST'}
          onSubmit={login}
        />
      </section>
      <section className={cx(['main-content__test-users-field'])}>
        <Accounts />
      </section>
    </div>
  );
}
