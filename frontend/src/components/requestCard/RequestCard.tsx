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
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { Request } from '@/entities/request';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/utils/constants';
import { SyntheticEvent } from 'react';
import { FavoriteButton } from '@/components';
import img1 from '@/assets/images/card-image-1.svg';
import img2 from '@/assets/images/card-image-2.svg';
import img3 from '@/assets/images/card-image-3.svg';

const styles = {
  favoriteButton: {
    minWidth: '32px',
    height: '32px',
    width: '32px',
    p: 0,
    border: '1px solid rgba(0, 0, 0, 0.12)',
  },
  favoriteButtonIcon: {
    color: 'rgba(0, 0, 0, 0.56)',
  },
  gap: {
    mb: '4px',
  },
  title: {
    p: 0,
    mr: '10px',
    display: '-webkit-box',
    overflow: 'hidden',
    lineClamp: 3, // For better compatibility
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 3, // Limit to 3 lines
  },
  goalDescription: {
    display: '-webkit-box',
    overflow: 'hidden',
    lineClamp: 2, // For better compatibility
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2, // Limit to 3 lines
  },
};

interface RequestCardProps {
  request: Request;
  layout: 'vertical' | 'horizontal' | 'compact';
  onAddToFavourites: (id: Request['id']) => void;
  onRemoveFromFavourites: (id: Request['id']) => void;
  onMakeDonationClick: (id: Request['id']) => void;
}

export function RequestCard({
  request,
  layout,
  onAddToFavourites,
  onRemoveFromFavourites,
  onMakeDonationClick,
}: RequestCardProps) {
  const navigate = useNavigate();

  const goalProgress = Math.floor(
    (request.request_goal_current_value / request.request_goal) * 100
  );

  const getImage = (requesterType, helpType) => {
    if (requesterType === 'organization') {
      return img2;
    } else if (helpType === 'finance') {
      return img1;
    } else {
      return img3;
    }
  };

  function removeFromFavourites(event: SyntheticEvent) {
    event.stopPropagation();
    onRemoveFromFavourites(request.id);
  }

  function addToFavourites(event: SyntheticEvent) {
    event.stopPropagation();
    onAddToFavourites(request.id);
  }

  function makeDonation(event: SyntheticEvent) {
    event.stopPropagation();
    onMakeDonationClick(request.id);
  }

  return (
    <>
      {layout === 'vertical' && (
        <Card
          sx={{
            maxWidth: 320,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
          }}
          onClick={() => navigate(routes.catalogRequest(request.id))}
        >
          <CardMedia
            component="img"
            height="220"
            image={getImage(request.requester_type, request.help_type)}
            alt="Картинка для карточки запроса о помощи"
            sx={{ objectFit: 'contain' }}
          />
          <Box
            sx={{
              height: '128px',
              p: '16px',
              display: 'flex',
              alignItems: 'flex-start',
            }}
          >
            <CardHeader title={request.title} sx={styles.title} />
            {request.is_favourite ? (
              <Button
                variant="outlined"
                sx={styles.favoriteButton}
                onClick={removeFromFavourites}
              >
                <StarIcon sx={styles.favoriteButtonIcon} />
              </Button>
            ) : (
              <Button
                variant="outlined"
                onClick={addToFavourites}
                sx={styles.favoriteButton}
              >
                <StarBorderIcon sx={styles.favoriteButtonIcon} />
              </Button>
            )}
          </Box>
          <Divider />
          <CardContent
            sx={{
              p: '10px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
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
                  <div key={index}>
                    <Typography variant="body2">
                      Область: {location.district}
                    </Typography>
                    <Typography variant="body2">
                      Населенный пункт: {location.city}
                    </Typography>
                  </div>
                ))
              )}
            </Stack>
            <Stack gap="4px">
              <Typography variant="subtitle2">Цель сбора</Typography>
              <Typography variant="body2" sx={styles.goalDescription}>
                {request.goal_description}
              </Typography>
            </Stack>
            <Stack gap="4px">
              <Typography variant="subtitle2">Завершение</Typography>
              <Typography variant="body2">
                {new Date(request.ending_date).toLocaleDateString()}
              </Typography>
            </Stack>
            <Stack gap="4px">
              <Typography variant="subtitle2">Мы собрали</Typography>
              <LinearProgress
                variant="determinate"
                value={goalProgress}
                sx={{ borderRadius: 1 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                  variant="body2"
                  sx={{ lineHeight: 1.5, opacity: 0.6 }}
                >
                  {request.request_goal_current_value} руб
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ lineHeight: 1.5, opacity: 0.6 }}
                >
                  {request.request_goal} руб
                </Typography>
              </Box>
            </Stack>
          </CardContent>
          <CardActions
            sx={{ display: 'block', p: '0 16px 20px 16px', mt: 'auto' }}
          >
            <Stack gap="4px">
              <Typography
                variant="body2"
                sx={{ lineHeight: 1.5, opacity: 0.6 }}
              >
                {request.contributors_count === 0
                  ? 'Вы будете первым'
                  : `Нас уже: ${request.contributors_count}`}
              </Typography>
              <Button
                variant="contained"
                size="large"
                sx={{ width: '100%' }}
                onClick={makeDonation}
              >
                ПОМОЧЬ
              </Button>
            </Stack>
          </CardActions>
        </Card>
      )}

      {layout === 'horizontal' && (
        <Card
          sx={{
            width: '1008px',
            p: '20px 0 30px 52px',
            display: 'flex',
            flexDirection: 'row',
            gap: '30px',
            boxShadow: 'none',
            borderBottom: '2px solid #f5f5f5',
            borderRadius: 0,
          }}
          onClick={() => navigate(routes.catalogRequest(request.id))}
        >
          <Stack sx={{ width: '252px' }}>
            <CardHeader title={request.title} sx={styles.title} />
            <Box sx={{ mt: '30px' }}>
              <Typography variant="subtitle2">Мы собрали</Typography>
              <LinearProgress
                variant="determinate"
                value={goalProgress}
                sx={{ borderRadius: 1, m: '4px 0 4px 0' }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                  variant="body2"
                  sx={{ lineHeight: 1.5, opacity: 0.6 }}
                >
                  {request.request_goal_current_value} руб
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ lineHeight: 1.5, opacity: 0.6 }}
                >
                  {request.request_goal} руб
                </Typography>
              </Box>
            </Box>
            <Box sx={{ mt: 'auto' }}>
              <Typography
                variant="body2"
                sx={{ lineHeight: 1.5, opacity: 0.6, mb: '10px' }}
              >
                {request.contributors_count === 0
                  ? 'Вы будете первым'
                  : `Нас уже: ${request.contributors_count}`}
              </Typography>
              <Button
                variant="contained"
                size="large"
                sx={{ width: '100%' }}
                onClick={makeDonation}
              >
                ПОМОЧЬ
              </Button>
            </Box>
          </Stack>
          <Stack sx={{ width: '240px' }}>
            <Box sx={{ height: '126px' }}>
              <Typography variant="subtitle2" sx={styles.gap}>
                Организатор
              </Typography>
              <Typography variant="body2">
                {request.organization.title}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={styles.gap}>
                Завершение
              </Typography>
              <Typography variant="body2">
                {new Date(request.ending_date).toLocaleDateString()}
              </Typography>
            </Box>
          </Stack>
          <Stack sx={{ width: '240px' }}>
            <Box sx={{ height: '126px' }}>
              <Typography variant="subtitle2" sx={styles.gap}>
                Локация
              </Typography>
              {request.helper_requirements.is_online ? (
                <Typography variant="body2">Онлайн</Typography>
              ) : (
                request.locations.map((location, index) => (
                  <div key={index}>
                    <Typography variant="body2">
                      Область: {location.district}
                    </Typography>
                    <Typography variant="body2">
                      Населенный пункт: {location.city}
                    </Typography>
                  </div>
                ))
              )}
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={styles.gap}>
                Цель сбора
              </Typography>
              <Typography variant="body2" sx={styles.goalDescription}>
                {request.goal_description}
              </Typography>
            </Box>
          </Stack>
          <FavoriteButton
            request={request}
            removeFromFavourites={removeFromFavourites}
            addToFavourites={addToFavourites}
          />
        </Card>
      )}
      {layout === 'compact' && (
        <Card sx={{ maxWidth: 320, height: 'fit-content' }}>
          <CardContent
            sx={{
              p: '10px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <Typography variant="h6">Вместе для добрых дел</Typography>
            <Stack gap="4px">
              <Typography variant="subtitle2">Цель сбора</Typography>
              <Typography variant="body2">
                {request.goal_description}
              </Typography>
            </Stack>
            <Stack gap="4px">
              <Typography variant="subtitle2">Завершение</Typography>
              <Typography variant="body2">
                {new Date(request.ending_date).toLocaleDateString()}
              </Typography>
            </Stack>
            <Stack gap="4px">
              <Typography variant="subtitle2">Мы собрали</Typography>
              <LinearProgress
                variant="determinate"
                value={goalProgress}
                sx={{ borderRadius: 1 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                  variant="body2"
                  sx={{ lineHeight: 1.5, opacity: 0.6 }}
                >
                  {request.request_goal_current_value} руб
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ lineHeight: 1.5, opacity: 0.6 }}
                >
                  {request.request_goal} руб
                </Typography>
              </Box>
            </Stack>
          </CardContent>
          <CardActions sx={{ display: 'block', p: '0 16px 20px 16px' }}>
            <Stack gap="4px">
              <Typography
                variant="body2"
                sx={{ lineHeight: 1.5, opacity: 0.6 }}
              >
                {request.contributors_count === 0
                  ? 'Вы будете первым'
                  : `Нас уже: ${request.contributors_count}`}
              </Typography>
              <Button
                variant="contained"
                size="large"
                sx={{ width: '100%' }}
                onClick={makeDonation}
              >
                ПОМОЧЬ
              </Button>
            </Stack>
          </CardActions>
        </Card>
      )}
    </>
  );
}
