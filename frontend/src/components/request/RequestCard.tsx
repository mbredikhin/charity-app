import {
  Divider,
  Stack,
  LinearProgress,
  Box,
  CardHeader,
  Typography,
  Button,
  CardMedia,
  CardContent,
  CardActions,
  Card,
} from '@mui/material';
import { Request } from '@/entities/request';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/utils/constants';
import { SyntheticEvent } from 'react';
import { FavouriteButton } from './FavouriteButton';
import img1 from '@/assets/images/card-image-1.svg';
import img2 from '@/assets/images/card-image-2.svg';
import img3 from '@/assets/images/card-image-3.svg';
import styles from './RequestCard.module.scss';
import classnames from 'classnames/bind';
import { formatDate } from '@/utils/dates';
const cx = classnames.bind(styles);

interface RequestCardProps {
  request: Request;
  layout: 'vertical' | 'horizontal' | 'compact';
  onAddToFavourites: (id: Request['id']) => void;
  onRemoveFromFavourites: (id: Request['id']) => void;
  onMakeDonationClick: (id: Request['id']) => void;
}

export interface RequestGoalProps {
  currentValue: number;
  goal: number;
}

export interface ActionButtonProps {
  onMakeDonationClick: () => void;
  contributionsCount: number;
}

function RequestGoal({ currentValue, goal }: RequestGoalProps) {
  const progress = Math.floor((currentValue / goal) * 100);

  return (
    <Box>
      <Typography variant="subtitle2">Мы собрали</Typography>
      <LinearProgress
        className={cx('request-goal__progress-bar')}
        variant="determinate"
        value={progress}
      />
      <Box className={cx('request-goal-description')}>
        <Typography
          className={cx('request-goal-description__text')}
          variant="body2"
        >
          {currentValue} руб
        </Typography>
        <Typography
          className={cx('request-goal-description__text')}
          variant="body2"
        >
          {goal} руб
        </Typography>
      </Box>
    </Box>
  );
}

function ActionButton({
  contributionsCount,
  onMakeDonationClick,
}: ActionButtonProps) {
  function makeDonation(event: SyntheticEvent) {
    event.stopPropagation();
    onMakeDonationClick();
  }

  return (
    <Box className={cx('action-button')}>
      <Typography className={cx('action-button__text')} variant="body2">
        {contributionsCount === 0
          ? 'Вы будете первым'
          : `Нас уже: ${contributionsCount}`}
      </Typography>
      <Button
        className={cx('action-button__button')}
        variant="contained"
        size="large"
        onClick={makeDonation}
      >
        ПОМОЧЬ
      </Button>
    </Box>
  );
}

const getPreviewImage = (
  requesterType: Request['requester_type'],
  helpType: Request['help_type']
) => {
  if (requesterType === 'organization') {
    return img2;
  } else if (helpType === 'finance') {
    return img1;
  } else {
    return img3;
  }
};

export function RequestCard({
  request,
  layout,
  onAddToFavourites,
  onRemoveFromFavourites,
  onMakeDonationClick,
}: RequestCardProps) {
  const navigate = useNavigate();

  function removeFromFavourites(event: SyntheticEvent) {
    event.stopPropagation();
    onRemoveFromFavourites(request.id);
  }

  function addToFavourites(event: SyntheticEvent) {
    event.stopPropagation();
    onAddToFavourites(request.id);
  }

  return (
    <Card
      className={cx(['request-card', `request-card--${layout}`])}
      onClick={() => navigate(routes.catalogRequest(request.id))}
    >
      {layout === 'vertical' ? (
        <>
          <CardMedia
            className={cx('request-card__preview-image')}
            component="img"
            height="220"
            alt="Request card"
            image={getPreviewImage(request.requester_type, request.help_type)}
          />
          <Divider />
        </>
      ) : null}
      <Box
        className={cx([
          'request-card-header',
          `request-card-header--${layout}`,
        ])}
      >
        {layout === 'compact' ? (
          <Typography variant="h6">Вместе для добрых дел</Typography>
        ) : (
          <>
            <CardHeader
              className={cx('request-card-header__title')}
              title={request.title}
            />
            {layout === 'horizontal' ? (
              <>
                <RequestGoal
                  currentValue={request.request_goal_current_value}
                  goal={request.request_goal}
                />
                <ActionButton
                  contributionsCount={request.contributors_count}
                  onMakeDonationClick={() => onMakeDonationClick(request.id)}
                />
              </>
            ) : null}
            {layout === 'vertical' ? (
              <FavouriteButton
                size="sm"
                request={request}
                addToFavourites={addToFavourites}
                removeFromFavourites={removeFromFavourites}
              />
            ) : null}
          </>
        )}
      </Box>
      <CardContent
        className={cx([
          'request-card-content',
          `request-card-content--${layout}`,
        ])}
      >
        {layout === 'compact' ? null : (
          <>
            <Stack gap="4px">
              <Typography variant="subtitle2">Организатор</Typography>
              <Typography variant="body2">
                {request.organization.title}
              </Typography>
            </Stack>
            <Stack gap="4px">
              <Typography variant="subtitle2">Локация</Typography>
              {request.helper_requirements.is_online ? (
                <Typography variant="body2">Онлайн</Typography>
              ) : (
                request.locations.map((location, index) => (
                  <Box key={index}>
                    <Typography variant="body2">
                      Область: {location.district}
                    </Typography>
                    <Typography variant="body2">
                      Населенный пункт: {location.city}
                    </Typography>
                  </Box>
                ))
              )}
            </Stack>
          </>
        )}
        <Stack gap="4px">
          <Typography variant="subtitle2">Цель сбора</Typography>
          <Typography variant="body2">{request.goal_description}</Typography>
        </Stack>
        <Stack gap="4px">
          <Typography variant="subtitle2">Завершение</Typography>
          <Typography variant="body2">
            {formatDate(request.ending_date)}
          </Typography>
        </Stack>
        {layout === 'horizontal' ? null : (
          <RequestGoal
            currentValue={request.request_goal_current_value}
            goal={request.request_goal}
          />
        )}
      </CardContent>
      {layout === 'horizontal' ? (
        <FavouriteButton
          size="md"
          request={request}
          addToFavourites={addToFavourites}
          removeFromFavourites={removeFromFavourites}
        />
      ) : (
        <CardActions className={cx('request-card-actions')}>
          <ActionButton
            contributionsCount={request.contributors_count}
            onMakeDonationClick={() => onMakeDonationClick(request.id)}
          />
        </CardActions>
      )}
    </Card>
  );
}
