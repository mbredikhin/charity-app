import { signIn as authorize } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { Accounts, AuthForm } from '@/components';
import styles from './SignIn.module.scss';
import classnames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/utils/constants';
const cx = classnames.bind(styles);

export function SignIn() {
  const error = useSelector((state) => state.authorization.error);
  const loading = useSelector((state) => state.authorization.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function signIn(data) {
    await dispatch(authorize(data))
      .unwrap()
      .then(() => navigate(routes.profile()));
  }

  return (
    <div className={cx(['main-content'])}>
      <section className={cx(['main-content__authForm'])}>
        <AuthForm
          loading={loading}
          error={error?.code === 'ERR_BAD_REQUEST'}
          onSubmit={signIn}
        />
      </section>
      <section className={cx(['main-content__test-users-field'])}>
        <Accounts />
      </section>
    </div>
  );
}
