import { Box, Typography } from '@mui/material';
import styles from './NotFound.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

export function NotFound() {
  return (
    <Box className={cx(['not-found'])}>
      <Typography variant="h5">It looks like you are lost...</Typography>
    </Box>
  );
}
