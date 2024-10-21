import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function AppHeader() {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="transparent" enableColorOnDark={true}>
      <Toolbar>
        <Box sx={{ '& button': { m: 1 } }}>
          <Button variant="outlined" onClick={() => navigate('/')}>
            Home
          </Button>
          <Button variant="outlined" onClick={() => navigate('/posts')}>
            Posts
          </Button>
          <Button variant="outlined" onClick={() => navigate('/profile')}>
            Profile
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
