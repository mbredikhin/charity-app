import { Box, Paper, Typography, Stack } from '@mui/material';
import { SyntheticEvent } from 'react';
import VerifiedIcon from '@/assets/images/verified.svg?react';
import CheckCircle from '@/assets/images/check-circle.svg?react';
import { Request as IRequest } from '@/entities/request';
import { FavouriteButton } from './FavouriteButton';
import { formatDate } from '@/utils/dates';
import styles from './Request.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

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
    <Paper className={cx('request')} variant="outlined">
      <Box className={cx('request-container')}>
        <Stack className={cx('request-header')} direction="row">
          <Typography variant="h4" className={cx('request-header__title')}>
            {request.title}
          </Typography>
          <FavouriteButton
            request={request}
            removeFromFavourites={removeFromFavourites}
            addToFavourites={addToFavourites}
          />
        </Stack>
        <Box className={cx('request-section')}>
          <Typography variant="h6">Организация</Typography>
          <Stack sx={{ gap: '4px' }}>
            <Typography variant="body2">
              {request.organization.title}
            </Typography>
            {request.organization.is_verified ? (
              <Typography
                className={cx('request__organization-badge')}
                variant="caption"
              >
                <VerifiedIcon /> Организация проверена
              </Typography>
            ) : null}
          </Stack>
        </Box>
        <Box className={cx('request-section')}>
          <Typography variant="h6">Кому мы помогаем</Typography>
          <Typography variant="body2">{request.description}</Typography>
        </Box>
        <Box className={cx('request-section')}>
          <Typography variant="h6">Цель сбора</Typography>
          <Typography variant="body2">{request.goal_description}</Typography>
        </Box>
        <Box className={cx('request-section')}>
          <Typography variant="h6">План действий</Typography>
          <Box className={cx('request-subsection')}>
            {request.actions_schedule.map((step, index) => (
              <Typography
                key={index}
                variant="body2"
                className={cx('request-step')}
              >
                {
                  <>
                    <CheckCircle
                      className={cx({
                        'check-icon': true,
                        'check-icon--disabled': !step.is_done,
                      })}
                    />
                    {step.step_label}
                  </>
                }
              </Typography>
            ))}
          </Box>
        </Box>
        <Box className={cx('request-section')}>
          <Typography variant="h6">Завершение</Typography>
          <Typography variant="body2">
            {formatDate(request.ending_date)}
          </Typography>
        </Box>
        <Box className={cx('request-section')}>
          <Typography variant="h6">Локация</Typography>
          <Box className={cx('request-subsection')}>
            {request.locations.map((location, index) => (
              <Box key={index}>
                <Box>
                  <Typography variant="subtitle2">Область: </Typography>
                  <Typography variant="body2">{location.district}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2">Насленный пункт: </Typography>
                  <Typography variant="body2">{location.city}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        <Box className={cx('request-section')}>
          <Typography variant="h6">Контакты</Typography>
          <Box
            className={cx(['request-subsection', 'request-subsection--row'])}
          >
            <Box className={cx('request__contact')}>
              <Typography variant="subtitle2">Телефон</Typography>
              <Typography variant="body2">{request.contacts.phone}</Typography>
            </Box>
            <Box className={cx('request__contact')}>
              <Typography variant="subtitle2">E-mail</Typography>
              <Typography variant="body2">{request.contacts.email}</Typography>
            </Box>
            <Box className={cx('request__contact')}>
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
