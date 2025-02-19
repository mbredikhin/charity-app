import { Request } from '@/entities/request';
import { Button, Typography, Stack } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { styled } from '@mui/material/styles';
import { SyntheticEvent } from 'react';

const RectangularButton = styled(Button)(() => ({
  borderRadius: 4,
}));

const styles = {
  button: {
    height: '28px',
    width: '132px',
    padding: '5px 10px',
    textTransform: 'none',
    color: '#000000',
    border: 'solid 2px #f5f5f5',
  },
  iconFavorite: {
    color: 'rgba(0, 0, 0, 0.56)',
  },
};

interface FavoriteButtonProps {
  request: Request;
  addToFavourites: (event: SyntheticEvent) => void;
  removeFromFavourites: (event: SyntheticEvent) => void;
}

export const FavoriteButton = ({
  request,
  removeFromFavourites,
  addToFavourites,
}: FavoriteButtonProps) => {
  return (
    <Stack sx={{ width: '128px' }}>
      <RectangularButton
        sx={styles.button}
        variant="outlined"
        startIcon={
          request.isFavourite ? (
            <StarIcon color="action" />
          ) : (
            <StarBorderIcon sx={styles.iconFavorite} />
          )
        }
        onClick={request.isFavourite ? removeFromFavourites : addToFavourites}
      >
        <Typography variant="body2">В избранное</Typography>
      </RectangularButton>
    </Stack>
  );
};
