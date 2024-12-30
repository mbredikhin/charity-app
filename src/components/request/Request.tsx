import { Box, Paper, Typography } from '@mui/material';
import VerifiedIcon from '@/assets/images/verified.svg?react';
import CheckCircleDisabledIcon from '@/assets/images/check-circle-disabled.svg?react';
import CheckCircleCheckedIcon from '@/assets/images/check-circle-checked.svg?react';
import { Request as IRequest } from '@/entities/request';

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
        <Typography variant="h4">{request.title}</Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <Typography variant="h6">Организация</Typography>
          <Typography variant="body2">{request.organization.title}</Typography>
          {request.organization.isVerified ? (
            <Typography variant="caption">
              <VerifiedIcon />
              Организация проверена
            </Typography>
          ) : null}
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
          <Typography variant="body2">{request.goalDescription}</Typography>
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
            {request.actionsSchedule.map((step, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                {
                  <>
                    {step.isDone ? (
                      <CheckCircleCheckedIcon />
                    ) : (
                      <CheckCircleDisabledIcon />
                    )}
                    {step.stepLabel}
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
            {new Date(request.endingDate).toLocaleDateString()}
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
            <div>
              <Typography variant="subtitle2">Область: </Typography>
              <Typography variant="body2">
                {request.location.district}
              </Typography>
            </div>
            <div>
              <Typography variant="subtitle2">Насленный пункт: </Typography>
              <Typography variant="body2">{request.location.city}</Typography>
            </div>
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
