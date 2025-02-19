import { Alert, Box, Typography } from '@mui/material';

export function Accounts() {
  const accounts = [
    {
      email: 'user-1@site.com',
      password: 'password',
    },
    {
      email: 'user-2@site.com',
      password: 'password',
    },
  ];

  return (
    <Box
      sx={{
        display: 'grid',
        gap: '90px',
        padding: '64px 40px',
      }}
    >
      <Typography variant="h4">Тестовые профили</Typography>
      <Box
        sx={{
          display: 'grid',
          gap: '30px',
          width: '320px',
        }}
      >
        {accounts.map(({ email, password }) => (
          <Alert key={email} variant="outlined" severity="info">
            <Box>
              <Typography variant="body2">{`Email: ${email}`}</Typography>
              <Typography variant="body2">{`Пароль: ${password}`}</Typography>
            </Box>
          </Alert>
        ))}
      </Box>
    </Box>
  );
}
