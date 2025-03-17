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
  size?: 'sm' | 'md';
  addToFavourites: (event: SyntheticEvent) => void;
  removeFromFavourites: (event: SyntheticEvent) => void;
}

export function FavouriteButton({
  request,
  size = 'md',
  removeFromFavourites,
  addToFavourites,
}: FavouriteButtonProps) {
  return (
    <Button
      className={cx(['favourite-button', `favourite-button--${size}`])}
      onClick={request.is_favourite ? removeFromFavourites : addToFavourites}
    >
      {size === 'md' ? (
        <Typography variant="body2">
          {request.is_favourite ? 'В избранном' : 'В избранное'}
        </Typography>
      ) : null}
      {request.is_favourite ? (
        <StarIcon color="action" />
      ) : (
        <StarBorderIcon className={cx('favourite-button__icon')} />
      )}
    </Button>
  );
}
