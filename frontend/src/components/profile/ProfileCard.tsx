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
import PersonIcon from '@/assets/images/PersonRounded.svg?react';
import { routes } from '@/utils/constants';
import { Profile } from '@/entities/profile';

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
    <Card sx={{ width: '320px', height: '436px' }} variant="outlined">
      <PersonIcon />
      <Divider />
      <CardContent
        sx={{ height: '95px', padding: '20px', marginBottom: '5px' }}
      >
        <Typography gutterBottom variant="h6" component="div">
          {profile.full_name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
          <Typography variant="subtitle2">{`Статус:`} </Typography>
          <Typography variant="body2">{`${profile?.status}`}</Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ padding: '20px' }}>
        <Button
          size="large"
          variant="outlined"
          color="inherit"
          sx={{ width: '280px', height: '42px' }}
          onClick={logout}
        >
          ВЫЙТИ ИЗ АККАУНТА
        </Button>
      </CardActions>
    </Card>
  );
}
