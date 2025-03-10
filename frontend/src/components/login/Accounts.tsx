import { Alert, Box, Typography } from '@mui/material';
import styles from './Accounts.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

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
    <Box className={cx(['accounts'])}>
      <Typography variant="h4">Тестовые профили</Typography>
      <Box className={cx(['accounts-list'])}>
        {accounts.map(({ email, password }) => (
          <Alert key={email} variant="outlined" severity="info">
            <Box>
              <Typography variant="body2">Email: {email}</Typography>
              <Typography variant="body2">Пароль: {password}</Typography>
            </Box>
          </Alert>
        ))}
      </Box>
    </Box>
  );
}
