import { Box, Paper, Typography, Stack } from '@mui/material';
import { SyntheticEvent } from 'react';
import VerifiedIcon from '@/assets/images/verified.svg?react';
import CheckCircleDisabledIcon from '@/assets/images/check-circle-disabled.svg?react';
import CheckCircleCheckedIcon from '@/assets/images/check-circle-checked.svg?react';
import { Request as IRequest } from '@/entities/request';
import { FavoriteButton } from '@/components';

interface RequestProps {
  request: IRequest;
  onAddToFavourites: (id: IRequest['id']) => void;
  onRemoveFromFavourites: (id: IRequest['id']) => void;
}

export function Request({
  request,
  onAddToFavourites,
  onRemoveFromFavourites,
}: RequestProps) {
  function removeFromFavourites(event: SyntheticEvent) {
    event.stopPropagation();
    onRemoveFromFavourites(request.id);
  }

  function addToFavourites(event: SyntheticEvent) {
    event.stopPropagation();
    onAddToFavourites(request.id);
  }
  return (
    <Paper
      variant="outlined"
      sx={{
        padding: '40px 36px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
        }}
      >
        <Stack
          direction="row"
          sx={{ justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Typography variant="h4" sx={{ maxWidth: '60%' }}>
            {request.title}
          </Typography>
          <FavoriteButton
            request={request}
            removeFromFavourites={removeFromFavourites}
            addToFavourites={addToFavourites}
          />
        </Stack>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <Typography variant="h6">Организация</Typography>
          <Stack sx={{ gap: '4px' }}>
            <Typography variant="body2">
              {request.organization.title}
            </Typography>
            {request.organization.is_verified ? (
              <Typography
                variant="caption"
                sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <VerifiedIcon /> Организация проверена
              </Typography>
            ) : null}
          </Stack>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <Typography variant="h6">Кому мы помогаем</Typography>
          <Typography variant="body2">{request.description}</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <Typography variant="h6">Цель сбора</Typography>
          <Typography variant="body2">{request.goal_description}</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <Typography variant="h6">План действий</Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            {request.actions_schedule.map((step, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                {
                  <>
                    {step.is_done ? (
                      <CheckCircleCheckedIcon />
                    ) : (
                      <CheckCircleDisabledIcon />
                    )}
                    {step.step_label}
                  </>
                }
              </Typography>
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <Typography variant="h6">Завершение</Typography>
          <Typography variant="body2">
            {new Date(request.ending_date).toLocaleDateString()}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <Typography variant="h6">Локация</Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            {request.locations.map((location, index) => (
              <div key={index}>
                <div>
                  <Typography variant="subtitle2">Область: </Typography>
                  <Typography variant="body2">{location.district}</Typography>
                </div>
                <div>
                  <Typography variant="subtitle2">Насленный пункт: </Typography>
                  <Typography variant="body2">{location.city}</Typography>
                </div>
              </div>
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <Typography variant="h6">Контакты</Typography>
          <Box
            sx={{
              display: 'flex',
              gap: '80px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <Typography variant="subtitle2">Телефон</Typography>
              <Typography variant="body2">{request.contacts.phone}</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <Typography variant="subtitle2">E-mail</Typography>
              <Typography variant="body2">{request.contacts.email}</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <Typography variant="subtitle2">Сайт</Typography>
              <Typography variant="body2">
                {request.contacts.website}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
