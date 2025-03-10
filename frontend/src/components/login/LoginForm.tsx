import { useState } from 'react';
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
import { ApiError, LoginCredentials } from '@/types';
import styles from './LoginForm.module.scss';
import classnames from 'classnames/bind';
import { emailRegex } from '@/utils/constants';
const cx = classnames.bind(styles);

interface LoginFormProps {
  loading: boolean;
  error: ApiError | null;
  onInput: () => void;
  onSubmit: (form: LoginCredentials) => void;
}

const validationRules: Record<
  keyof LoginCredentials,
  (value: string) => boolean
> = {
  email: (value: string) => emailRegex.test(value),
  password: (value: string) => value.length >= 8,
};

export function LoginForm({
  loading,
  error,
  onInput,
  onSubmit,
}: LoginFormProps) {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [form, setForm] = useState<LoginCredentials>({
    email: '',
    password: '',
  });
  const isFormValid = (Object.keys(form) as (keyof LoginCredentials)[]).every(
    (key) => validationRules[key](form[key])
  );
  const theme = useTheme();
  const canSubmit = !loading && isFormValid;

  function changeForm(payload: Partial<LoginCredentials>) {
    setForm({ ...form, ...payload });
  }

  function submit() {
    onSubmit(form);
  }

  return (
    <Box component="section" className={cx(['login-form'])}>
      <Typography variant="h4">Авторизация</Typography>
      <Box
        className={cx(['form'])}
        component="form"
        noValidate
        autoComplete="off"
      >
        <Typography variant="h5">Вход</Typography>
        <TextField
          type="email"
          id="email"
          label="Email"
          placeholder="Введите email"
          error={!!error?.errors?.email}
          helperText={
            error?.errors?.email ? 'Введите корректный email-адрес' : ''
          }
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          onInput={onInput}
          onChange={({ target }) => changeForm({ email: target.value })}
        />

        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="password" shrink>
            Пароль
          </InputLabel>
          <OutlinedInput
            notched
            id="password"
            label="Password"
            placeholder="Введите пароль"
            error={!!error?.errors?.password}
            type={isPasswordHidden ? 'password' : 'text'}
            endAdornment={
              <InputAdornment position="end">
                {/* @ts-ignore */}
                <IconButton
                  edge="end"
                  aria-label={
                    isPasswordHidden ? 'Show password' : 'Hide password'
                  }
                  onClick={() => setIsPasswordHidden(!isPasswordHidden)}
                >
                  {isPasswordHidden ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            onInput={onInput}
            onChange={({ target }) => changeForm({ password: target.value })}
          />
          {error?.errors?.password ? (
            <FormHelperText sx={{ color: theme.palette.error.main }}>
              Введите корректный пароль
            </FormHelperText>
          ) : null}
        </FormControl>

        <Button
          fullWidth
          variant="contained"
          size="large"
          disabled={!canSubmit}
          onClick={submit}
        >
          Войти
        </Button>
      </Box>
    </Box>
  );
}
