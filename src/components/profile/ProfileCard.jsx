import PropTypes from 'prop-types';
import { Card, CardContent, CircularProgress, Typography } from '@mui/material';

export function ProfileCard({ profile, loading }) {
  return (
    <Card variant="outlined" style={{ minWidth: '250px' }}>
      <CardContent>
        <Typography variant="h6">Profile</Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography variant="body2">Name: {profile.name}</Typography>
            <Typography variant="body2">
              Username: {profile.username}
            </Typography>
            <Typography variant="body2">Email: {profile.email}</Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
}

ProfileCard.propTypes = {
  profile: PropTypes.object,
  loading: PropTypes.bool,
};
