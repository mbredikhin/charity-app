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

interface CatalogFilters {
  requesterType: 'person' | 'organization' | null;
  helpType: 'finance' | 'material' | null;
  helperRequirements: {
    helperType: 'group' | 'single' | null;
    isOnline: boolean | null;
    qualification: 'professional' | 'common' | null;
  };
}

interface CatalogFiltersProps {
  filters: CatalogFilters;
  onChange: (payload: Partial<CatalogFilters>) => void;
  onReset: () => void;
}

export function CatalogFilters({
  filters,
  onChange,
  onReset,
}: CatalogFiltersProps) {
  return (
    <Paper
      variant="outlined"
      sx={{
        padding: '20px',
        display: 'grid',
        gap: '20px',
      }}
    >
      <Typography variant="h6">Фильтрация</Typography>

      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">Кому мы помогаем</FormLabel>
        <FormGroup sx={{ paddingLeft: '10px' }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.requesterType === 'person'}
                onChange={(event) =>
                  onChange({
                    requesterType: event.target.checked ? 'person' : null,
                  })
                }
              />
            }
            label="Пенсионеры"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.requesterType === 'organization'}
                onChange={(event) =>
                  onChange({
                    requesterType: event.target.checked ? 'organization' : null,
                  })
                }
              />
            }
            label="Дома престарелых"
          />
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">Чем мы помогаем</FormLabel>
        <FormGroup sx={{ paddingLeft: '10px' }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.helpType === 'material'}
                onChange={(event) =>
                  onChange({
                    helpType: event.target.checked ? 'material' : null,
                  })
                }
              />
            }
            label="Вещи"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.helpType === 'finance'}
                onChange={(event) =>
                  onChange({
                    helpType: event.target.checked ? 'finance' : null,
                  })
                }
              />
            }
            label="Финансирование"
          />
        </FormGroup>
      </FormControl>

      <Accordion
        expanded
        variant="outlined"
        sx={{
          border: 'none',
        }}
      >
        <AccordionSummary
          sx={{
            border: '1px solid #00000010',
            paddingLeft: '42px',
          }}
        >
          <Typography variant="body1">Волонтерство</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 0 }}>
          <Paper
            variant="outlined"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              padding: '8px 16px 16px 42px',
              background: '#F5F5F5',
              border: 'none',
            }}
          >
            <FormControl component="fieldset" variant="standard">
              <FormLabel component="legend">Специализация</FormLabel>
              <FormGroup sx={{ paddingLeft: '10px' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        filters.helperRequirements.qualification ===
                        'professional'
                      }
                      onChange={(event) =>
                        onChange({
                          helperRequirements: {
                            ...filters.helperRequirements,
                            qualification: event.target.checked
                              ? 'professional'
                              : null,
                          },
                        })
                      }
                    />
                  }
                  label="Квалифицированная"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        filters.helperRequirements.qualification === 'common'
                      }
                      onChange={(event) =>
                        onChange({
                          helperRequirements: {
                            ...filters.helperRequirements,
                            qualification: event.target.checked
                              ? 'common'
                              : null,
                          },
                        })
                      }
                    />
                  }
                  label="Не требует профессии"
                />
              </FormGroup>
            </FormControl>
            <FormControl component="fieldset" variant="standard">
              <FormLabel component="legend">Формат</FormLabel>
              <FormGroup sx={{ paddingLeft: '10px' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.helperRequirements.isOnline === true}
                      onChange={(event) =>
                        onChange({
                          helperRequirements: {
                            ...filters.helperRequirements,
                            isOnline: event.target.checked ? true : null,
                          },
                        })
                      }
                    />
                  }
                  label="Онлайн"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.helperRequirements.isOnline === false}
                      onChange={(event) =>
                        onChange({
                          helperRequirements: {
                            ...filters.helperRequirements,
                            isOnline: event.target.checked ? false : null,
                          },
                        })
                      }
                    />
                  }
                  label="Офлайн"
                />
              </FormGroup>
            </FormControl>
            <FormControl component="fieldset" variant="standard">
              <FormLabel component="legend">Необходимо волонтеров</FormLabel>
              <FormGroup sx={{ paddingLeft: '10px' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        filters.helperRequirements.helperType === 'group'
                      }
                      onChange={(event) =>
                        onChange({
                          helperRequirements: {
                            ...filters.helperRequirements,
                            helperType: event.target.checked ? 'group' : null,
                          },
                        })
                      }
                    />
                  }
                  label="Группа"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        filters.helperRequirements.helperType === 'single'
                      }
                      onChange={(event) =>
                        onChange({
                          helperRequirements: {
                            ...filters.helperRequirements,
                            helperType: event.target.checked ? 'single' : null,
                          },
                        })
                      }
                    />
                  }
                  label="Один"
                />
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
