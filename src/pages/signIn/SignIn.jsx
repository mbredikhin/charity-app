import { signIn as authorize } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { Accounts, AuthForm } from '@/components';
import { toast } from 'react-toastify';
import styles from './SignIn.module.scss';
import classnames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
const cx = classnames.bind(styles);

export function SignIn() {
  const error = useSelector((state) => state.authorization.error);
  const loading = useSelector((state) => state.authorization.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function signIn(data) {
    try {
      await dispatch(authorize(data)).unwrap();
    } catch (error) {
      if (error.code === 'ERR_BAD_RESPONSE') {
        toast.error('Ошибка! Попробуйте еще раз', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      }
      return;
    }
    navigate('/profile');
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
