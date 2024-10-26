import * as React from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
  FormHelperText,
  Button,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

export const AuthForm = ({ error = false }) => {
  const [emailValidationError, setEmailValidationError] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const theme = useTheme();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('Form submission prevented');
  };

  return (
    <Box component="section" sx={{ px: 4, py: 8 }}>
      <Typography variant="h1" sx={{ fontSize: 'h4.fontSize', mb: 10 }}>
        Авторизация
      </Typography>
      <Typography variant="h2" sx={{ fontSize: 'h5.fontSize', mb: 3 }}>
        Вход
      </Typography>
      <Box
        component="form"
        sx={{ width: '75%' }}
        onSubmit={handleFormSubmit}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="login-input"
          label="Логин"
          type="text"
          placeholder="Введите e-mail"
          helperText={
            error ? (
              <span style={{ color: theme.palette.error.main }}>
                {' '}
                {'Введите корректный email-адрес'}
              </span>
            ) : (
              ''
            )
          }
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          sx={{ mb: 3 }}
        />

        <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
          <InputLabel htmlFor="outlined-adornment-password" shrink>
            Пароль
          </InputLabel>
          <OutlinedInput
            notched
            placeholder="Введите пароль"
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            // helperText={error ? 'Введите корректный пароль' : ''}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          {error && (
            <FormHelperText sx={{ color: theme.palette.error.main }}>
              {'Введите корректный пароль'}
            </FormHelperText>
          )}{' '}
        </FormControl>
        <Button
          variant="contained"
          size="large"
          type="submit"
          sx={{ width: '100%' }}
        >
          Войти
        </Button>
      </Box>
    </Box>
  );
};
