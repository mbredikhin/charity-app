import { lazy } from 'react';
import { Request } from '@/entities/request';
import { Pagination, Box, Typography, CircularProgress } from '@mui/material';
import { RequestCard } from '@/components';
import { usePagination } from '@/hooks';
import { Suspense, useEffect } from 'react';
import NotFoundResult from '@/assets/images/not-found-result.svg?react';
import styles from './Requests.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

const RequestsMap = lazy(() => import('./RequestsMap'));

interface RequestsProps {
  requests: Request[];
  layout: 'vertical' | 'horizontal' | 'map';
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
  const [currentPageRequests, pagination, goToPage] = usePagination(
    requests,
    3
  );

  useEffect(() => {
    goToPage(1);
  }, []);

  const isMapActive = import.meta.env.VITE_MAPS_ENABLED && layout === 'map';

  if (!requests.length) {
    return (
      <Box className={cx(['requests-wrapper', 'requests-wrapper--no-result'])}>
        <NotFoundResult />
        <Typography variant="h5">Запросы не найдены</Typography>
      </Box>
    );
  }

  return (
    <Box className={cx('requests-wrapper')}>
      {isMapActive ? (
        <Suspense fallback={<CircularProgress />}>
          <RequestsMap requests={requests} />;
        </Suspense>
      ) : (
        <Box className={cx(['requests', `requests--${layout}`])}>
          {currentPageRequests.map((request) => (
            <RequestCard
              key={request.id}
              layout={layout as Exclude<RequestsProps['layout'], 'map'>}
              request={request}
              onAddToFavourites={onAddRequestToFavourites}
              onRemoveFromFavourites={onRemoveRequestFromFavourites}
              onMakeDonationClick={onMakeDonationClick}
            />
          ))}
        </Box>
      )}

      {requests.length && !isMapActive ? (
        <Box className={cx('requests-pagination')}>
          <Pagination
            color="primary"
            size="large"
            boundaryCount={1}
            page={pagination.page}
            count={pagination.pagesCount}
            onChange={(_, page) => goToPage(page)}
          />
        </Box>
      ) : null}
    </Box>
  );
}
