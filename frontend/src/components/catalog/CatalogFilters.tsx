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
import type { CatalogFilters } from '@/types';
const cx = classnames.bind(styles);

interface FilterSchema {
  label: string;
  value: string | boolean;
}

interface CatalogFiltersProps {
  filters: CatalogFilters;
  onChange: (filters: CatalogFilters) => void;
  onReset: () => void;
}

const filtersSchema: Record<
  string,
  Record<string, FilterSchema[]> | FilterSchema[]
> = {
  requester_type: [
    {
      label: 'Пенсионеры',
      value: 'person',
    },
    {
      label: 'Дома престарелых',
      value: 'organization',
    },
  ],
  help_type: [
    {
      label: 'Вещи',
      value: 'material',
    },
    {
      label: 'Финансирование',
      value: 'finance',
    },
  ],
  helper_requirements: {
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
    is_online: [
      {
        label: 'Онлайн',
        value: true,
      },
      {
        label: 'Офлайн',
        value: false,
      },
    ],
    helper_type: [
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
    const filtersPayload = { ...filters };
    set(filtersPayload, path, xor(get(filtersPayload, path), [value]));
    onChange(filtersPayload);
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
          {renderFilters('requester_type')}
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">Чем мы помогаем</FormLabel>
        <FormGroup sx={{ paddingLeft: '10px' }}>
          {renderFilters('help_type')}
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
                {renderFilters('helper_requirements.qualification')}
              </FormGroup>
            </FormControl>
            <FormControl component="fieldset" variant="standard">
              <FormLabel component="legend">Формат</FormLabel>
              <FormGroup sx={{ paddingLeft: '10px' }}>
                {renderFilters('helper_requirements.is_online')}
              </FormGroup>
            </FormControl>
            <FormControl component="fieldset" variant="standard">
              <FormLabel component="legend">Необходимо волонтеров</FormLabel>
              <FormGroup sx={{ paddingLeft: '10px' }}>
                {renderFilters('helper_requirements.helper_type')}
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
