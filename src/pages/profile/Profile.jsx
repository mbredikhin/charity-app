import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '@mui/material';
import { fetchProfile } from '@/store';
import { ProfileCard } from '@/components';
import styles from './Profile.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

export function Profile() {
  const profile = useSelector((state) => state.profile.profile);
  const loading = useSelector((state) => state.profile.loading);
  const error = useSelector((state) => state.profile.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  return (
    <div className={cx(['profile'])}>
      {error ? (
        <Alert severity="warning">{error}</Alert>
      ) : (
        <ProfileCard profile={profile} loading={loading} />
      )}
    </div>
  );
}
