import * as pt from 'prop-types';
import { RequestType } from '@/types/request';
import styles from './Requests.module.scss';
import classnames from 'classnames/bind';
import { Pagination } from '@mui/material';
import { RequestCard } from '../requestCard/RequestCard';
import { usePagination } from '@/hooks';
import { useEffect } from 'react';
const cx = classnames.bind(styles);

export function Requests({
  requests,
  layout,
  onAddRequestToFavourites,
  onRemoveRequestFromFavourites,
  onMakeDonationClick,
}) {
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
    <div className={cx('requests-wrapper')}>
      <div className={cx(['requests', `requests--${layout}`])}>
        {currentPageRequests.map((request) => (
          <RequestCard
            key={request.id}
            layout="vertical"
            request={request}
            onAddToFavourites={onAddRequestToFavourites}
            onRemoveFromFavourites={onRemoveRequestFromFavourites}
            onMakeDonationClick={onMakeDonationClick}
          />
        ))}
      </div>
      {requests.length ? (
        <Pagination
          color="primary"
          size="large"
          boundaryCount={1}
          page={pagination.page}
          count={pagination.pagesCount}
          onChange={(_, page) => goToPage(page)}
        />
      ) : null}
    </div>
  );
}

Requests.propTypes = {
  requests: pt.arrayOf(RequestType).isRequired,
  layout: pt.oneOf(['vertical', 'horizontal']).isRequired,
  onAddRequestToFavourites: pt.func.isRequired,
  onRemoveRequestFromFavourites: pt.func.isRequired,
  onMakeDonationClick: pt.func.isRequired,
};
