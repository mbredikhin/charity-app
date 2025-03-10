import { ChangeEvent, FormEvent, useState } from 'react';
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

interface AuthFormProps {
  loading: boolean;
  error: Error | null;
  onSubmit: (credentials: { email: string; password: string }) => void;
}

export function AuthForm({ loading, error, onSubmit }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const theme = useTheme();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: MouseEvent) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event: MouseEvent) => {
    event.preventDefault();
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit({ email, password });
  };

  const handleEmailInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value.trim());
  };

  const handlePassInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value.trim());
  };

  return (
    <Box
      component="section"
      sx={{
        display: 'grid',
        gap: '90px',
        padding: '64px 40px',
      }}
    >
      <Typography variant="h4">Авторизация</Typography>
      <Box
        sx={{
          display: 'grid',
          gap: '30px',
        }}
      >
        <Typography variant="h5">Вход</Typography>
        <Box
          component="form"
          sx={{ width: '75%' }}
          onSubmit={handleFormSubmit}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="email-input"
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
            onChange={handleEmailInputChange}
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
              onChange={handlePassInputChange}
              endAdornment={
                <InputAdornment position="end">
                  {/* @ts-ignore */}
                  <IconButton
                    aria-label={
                      showPassword
                        ? 'hide the password'
                        : 'display the password'
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
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
            disabled={loading}
            sx={{ width: '100%', marginTop: '15px' }}
          >
            Войти
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
