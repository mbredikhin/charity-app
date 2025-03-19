import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from '@mui/material';
import { useStore } from '@/store';
import { useNavigate } from 'react-router-dom';
import ProfileAvatar from '@/assets/images/profile-avatar.svg?react';
import { routes } from '@/utils/constants';
import { Profile } from '@/entities/profile';
import styles from './ProfileCard.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

interface ProfileCardProps {
  profile: Profile;
}

export function ProfileCard({ profile }: ProfileCardProps) {
  const navigate = useNavigate();
  const signOut = useStore((state) => state.signOut);

  async function logout() {
    signOut();
    navigate(routes.login());
  }
  return (
    <Card className={cx('profile-card')} variant="outlined">
      <Box className={cx('profile-card-avatar')}>
        <ProfileAvatar />
      </Box>
      <Divider />
      <CardContent className={cx('profile-card-content')}>
        <Typography gutterBottom variant="h6" component="div">
          {profile.full_name}
        </Typography>
        <Box className={cx('profile-card-status')}>
          <Typography variant="subtitle2">Статус: </Typography>
          <Typography variant="body2">{profile.status}</Typography>
        </Box>
      </CardContent>
      <CardActions className={cx('profile-card-actions')}>
        <Button
          className={cx('profile-card-actions__logout-button')}
          size="large"
          variant="outlined"
          color="inherit"
          onClick={logout}
        >
          ВЫЙТИ ИЗ АККАУНТА
        </Button>
      </CardActions>
    </Card>
  );
}
