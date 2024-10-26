import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from '@mui/material';

export const AuthFrom = () => {
  return (
    <Box sx={{ px: 4, py: 8 }}>
      <Typography variant="h1" sx={{ fontSize: 'h4.fontSize', mb: 10 }}>
        Авторизация
      </Typography>
      <Typography variant="h2" sx={{ fontSize: 'h5.fontSize', mb: 3 }}>
        Вход
      </Typography>
      <Box
        component="form"
        sx={{ '& .MuiTextField-root': { width: '75%' } }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="login-input"
          label="Логин"
          type="text"
          placeholder="Введите e-mail"
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
      </Box>
    </Box>
  );
};
