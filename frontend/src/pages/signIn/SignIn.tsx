import { useStore } from '@/store';
import { Accounts, AuthForm } from '@/components';
import styles from './SignIn.module.scss';
import classnames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/utils/constants';
import { useEffect } from 'react';
const cx = classnames.bind(styles);

export function SignIn() {
  const {
    data: { isAuthenticated },
    loading,
    error,
  } = useStore((state) => state.auth);
  const signIn = useStore((state) => state.signIn);
  const navigate = useNavigate();

  async function login(credentials: { email: string; password: string }) {
    await signIn(credentials);
    navigate(routes.profile());
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.profile());
    }
  }, []);

  return (
    <div className={cx(['main-content'])}>
      <section className={cx(['main-content__authForm'])}>
        <AuthForm loading={loading} error={error} onSubmit={login} />
      </section>
      <section className={cx(['main-content__test-users-field'])}>
        <Accounts />
      </section>
    </div>
  );
}
