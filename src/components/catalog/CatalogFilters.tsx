import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Paper,
  Typography,
} from '@mui/material';
import styles from './CatalogFilters.module.scss';
import classnames from 'classnames/bind';
import { get, set, xor } from '@/utils/common';
const cx = classnames.bind(styles);

interface CatalogFilters {
  requesterType: ('person' | 'organization')[];
  helpType: ('finance' | 'material')[];
  helperRequirements: {
    helperType: ('group' | 'single')[];
    isOnline: boolean[];
    qualification: ('professional' | 'common')[];
  };
}

interface FilterSchema {
  label: string;
  value: string | boolean;
}

interface CatalogFiltersProps {
  filters: CatalogFilters;
  onChange: (payload: Partial<CatalogFilters>) => void;
  onReset: () => void;
}

const filtersSchema: Record<
  string,
  Record<string, FilterSchema[]> | FilterSchema[]
> = {
  requesterType: [
    {
      label: 'Пенсионеры',
      value: 'person',
    },
    {
      label: 'Дома престарелых',
      value: 'organization',
    },
  ],
  helpType: [
    {
      label: 'Вещи',
      value: 'material',
    },
    {
      label: 'Финансирование',
      value: 'finance',
    },
  ],
  helperRequirements: {
    qualification: [
      {
        label: 'Квалифицированная',
        value: 'professional',
      },
      {
        label: 'Не требует профессии',
        value: 'common',
      },
    ],
    isOnline: [
      {
        label: 'Онлайн',
        value: true,
      },
      {
        label: 'Офлайн',
        value: false,
      },
    ],
    helperType: [
      {
        label: 'Группа',
        value: 'group',
      },
      {
        label: 'Один',
        value: 'single',
      },
    ],
  },
};

export function CatalogFilters({
  filters,
  onChange,
  onReset,
}: CatalogFiltersProps) {
  function changeFilter(path: string, value: string | boolean) {
    set(filters, path, xor(get(filters, path), [value]));
    onChange(filters);
  }

  function renderFilters(path: string) {
    return get(filtersSchema, path).map(({ label, value }, index) => (
      <FormControlLabel
        key={index}
        label={label}
        control={
          <Checkbox
            checked={get(filters, path).includes(value)}
            onChange={() => changeFilter(path, value)}
          />
        }
      />
    ));
  }

  return (
    <Paper variant="outlined" className={cx('catalog-filters')}>
      <Typography variant="h6">Фильтрация</Typography>

      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">Кому мы помогаем</FormLabel>
        <FormGroup sx={{ paddingLeft: '10px' }}>
          {renderFilters('requesterType')}
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">Чем мы помогаем</FormLabel>
        <FormGroup sx={{ paddingLeft: '10px' }}>
          {renderFilters('helpType')}
        </FormGroup>
      </FormControl>

      <Accordion
        expanded
        variant="outlined"
        sx={{
          border: 'none',
        }}
      >
        <AccordionSummary className={cx('catalog-filters-form__title')}>
          <Typography variant="body1">Волонтерство</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 0 }}>
          <Paper
            variant="outlined"
            className={cx([
              'catalog-filters-form',
              'catalog-filters-form--secondary',
            ])}
          >
            <FormControl component="fieldset" variant="standard">
              <FormLabel component="legend">Специализация</FormLabel>
              <FormGroup sx={{ paddingLeft: '10px' }}>
                {renderFilters('helperRequirements.qualification')}
              </FormGroup>
            </FormControl>
            <FormControl component="fieldset" variant="standard">
              <FormLabel component="legend">Формат</FormLabel>
              <FormGroup sx={{ paddingLeft: '10px' }}>
                {renderFilters('helperRequirements.isOnline')}
              </FormGroup>
            </FormControl>
            <FormControl component="fieldset" variant="standard">
              <FormLabel component="legend">Необходимо волонтеров</FormLabel>
              <FormGroup sx={{ paddingLeft: '10px' }}>
                {renderFilters('helperRequirements.helperType')}
              </FormGroup>
            </FormControl>
          </Paper>
        </AccordionDetails>
      </Accordion>

      <Button
        fullWidth
        sx={{ marginTop: '20px' }}
        color="inherit"
        variant="outlined"
        size="large"
        onClick={onReset}
      >
        Сбросить
      </Button>
    </Paper>
  );
}
