import { Request } from '@/entities/request';
import styles from './Requests.module.scss';
import classnames from 'classnames/bind';
import { Pagination, Paper, Box, Typography } from '@mui/material';
import { RequestCard } from '../requestCard/RequestCard';
import { usePagination } from '@/hooks';
import { useEffect } from 'react';
import NotFoundResult from '@/assets/images/not-found-result.svg?react';
const cx = classnames.bind(styles);

interface RequestsProps {
  requests: Request[];
  layout: string;
  onAddRequestToFavourites: (id: Request['id']) => void;
  onRemoveRequestFromFavourites: (id: Request['id']) => void;
  onMakeDonationClick: (id: Request['id']) => void;
}

export function Requests({
  requests,
  layout,
  onAddRequestToFavourites,
  onRemoveRequestFromFavourites,
  onMakeDonationClick,
}: RequestsProps) {
  const [currentPageRequests, pagination, goToPage, goToPrevPage] =
    usePagination(requests, 3);

  useEffect(() => {
    goToPage(1);
  }, []);

  useEffect(() => {
    if (!currentPageRequests.length) {
      goToPrevPage();
    }
  }, [currentPageRequests]);

  return (
    <div className={cx('requests-wrapper')} style={{ position: 'relative' }}>
      {requests.length ? (
        <div className={cx(['requests', `requests--${layout}`])}>
          {currentPageRequests.map((request) => (
            <RequestCard
              key={request.id}
              layout={layout}
              request={request}
              onAddToFavourites={onAddRequestToFavourites}
              onRemoveFromFavourites={onRemoveRequestFromFavourites}
              onMakeDonationClick={onMakeDonationClick}
            />
          ))}
        </div>
      ) : (
        <Box
          sx={{
            height: '800px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <NotFoundResult />
          <Typography variant="h5" sx={{ mt: '20px' }}>
            Запросы не найдены
          </Typography>
        </Box>
      )}
      {requests.length ? (
        <Pagination
          color="primary"
          size="large"
          boundaryCount={1}
          page={pagination.page}
          count={pagination.pagesCount}
          onChange={(_, page) => goToPage(page)}
          sx={{ mb: '28px' }}
        />
      ) : null}
    </div>
  );
}
