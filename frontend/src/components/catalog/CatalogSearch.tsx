import {
  FormControl,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { ChangeEvent } from 'react';
import styles from './CatalogSearch.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

interface CatalogSearchProps {
  onChange: (search: string) => void;
}

export function CatalogSearch({ onChange }: CatalogSearchProps) {
  function changeSearch(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  return (
    <Paper className={cx('catalog-search')} variant="outlined">
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
