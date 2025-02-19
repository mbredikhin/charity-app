import React from 'react';
import {
  FormControl,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { Search } from '@mui/icons-material';

interface CatalogSearchProps {
  onChange: (search: string) => void;
}

export function CatalogSearch({ onChange }: CatalogSearchProps) {
  function changeSearch(event) {
    onChange(event.target.value);
  }

  return (
    <Paper
      variant="outlined"
      sx={{
        padding: '20px 36px 40px',
        display: 'grid',
        gap: '20px',
      }}
    >
      <Typography variant="h6">Найти запрос</Typography>
      <FormControl component="fieldset" variant="standard">
        <TextField
          id="search"
          fullWidth
          variant="standard"
          placeholder="Введите название задачи или организации"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            },
          }}
          onChange={changeSearch}
        />
      </FormControl>
    </Paper>
  );
}
