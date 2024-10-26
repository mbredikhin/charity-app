import { Box, Typography } from '@mui/material';
import { AuthForm } from '../../components/authForm/AuthForm';
// import { MyComponent } from '@/components';

export function Playground() {
  return (
    <Box sx={{ p: 2, border: '1px solid grey', width: 1 / 2 }}>
      <AuthForm />
      <AuthForm error={true} />
    </Box>
  );
}
