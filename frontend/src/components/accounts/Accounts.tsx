import React from 'react';
import { Alert, AlertTitle, Box, Typography } from '@mui/material';

export function Accounts() {
  const accounts = [
    {
      title: 'Первый пользователь',
      login: 'testUser3@test.com',
      password: 'password3',
    },
    {
      title: 'Второй пользователь',
      login: 'testUser4@test.com',
      password: 'password4',
    },
    {
      title: 'Третий пользователь',
      login: 'testUser5@test.com',
      password: 'password5',
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
        {accounts.map(({ title, login, password }) => (
          <Alert key={title} variant="outlined" severity="info">
            <AlertTitle>{title}</AlertTitle>
            <Box>
              <Typography variant="body2">{`Логин: ${login}`}</Typography>
              <Typography variant="body2">{`Пароль: ${password}`}</Typography>
            </Box>
          </Alert>
        ))}
      </Box>
    </Box>
  );
}
