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
  Button,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export const AuthFrom = () => {
  const [emailValidationError, setEmailValidationError] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  // Logic for pass inputs

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ px: 4, py: 8 }}>
      <Typography variant="h1" sx={{ fontSize: 'h4.fontSize', mb: 10 }}>
        Авторизация
      </Typography>
      <Typography variant="h2" sx={{ fontSize: 'h5.fontSize', mb: 3 }}>
        Вход
      </Typography>
      <Box component="form" sx={{ width: '75%' }} noValidate autoComplete="off">
        <TextField
          id="login-input"
          label="Логин"
          type="text"
          placeholder="Введите e-mail"
          helperText={
            emailValidationError ? 'Введите корректный email-адрес' : ''
          }
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          sx={{ mb: 3 }}
        />

        {/* MORE CUSTOMIZABLE INPUT STRUCTURE*/}
        {/* <FormControl>
          <InputLabel htmlFor="component-outlined">Name</InputLabel>
          <OutlinedInput
            id="component-outlined"
            defaultValue="Composed TextField"
            label="Name"
          />
        </FormControl> */}
        {/* ------------------ FIRST PASS */}
        <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
          <InputLabel htmlFor="outlined-adornment-password" shrink>
            Пароль
          </InputLabel>
          <OutlinedInput
            notched
            placeholder="Введите пароль"
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
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
