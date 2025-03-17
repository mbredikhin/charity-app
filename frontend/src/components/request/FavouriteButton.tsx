import { Request } from '@/entities/request';
import { Typography, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { SyntheticEvent } from 'react';
import styles from './FavouriteButton.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

interface FavouriteButtonProps {
  request: Request;
  addToFavourites: (event: SyntheticEvent) => void;
  removeFromFavourites: (event: SyntheticEvent) => void;
}

export function FavouriteButton({
  request,
  removeFromFavourites,
  addToFavourites,
}: FavouriteButtonProps) {
  return (
    <Button
      className={cx('favourite-button')}
      variant="outlined"
      startIcon={
        request.is_favourite ? (
          <StarIcon color="action" />
        ) : (
          <StarBorderIcon className={cx('favourite-button__icon')} />
        )
      }
      onClick={request.is_favourite ? removeFromFavourites : addToFavourites}
    >
      <Typography variant="body2">
        {request.is_favourite ? 'В избранном' : 'В избранное'}
      </Typography>
    </Button>
  );
}
