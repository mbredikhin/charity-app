import * as pt from 'prop-types';
import { RequestType } from '@/types/request';
import styles from './Requests.module.scss';
import classnames from 'classnames/bind';
import { Pagination } from '@mui/material';
import { useCallback, useEffect, useReducer, useState } from 'react';
import { RequestCard } from '../requestCard/RequestCard';
const cx = classnames.bind(styles);

const PAGINATION_LIMIT = 3;

function paginationReducer(state, action) {
  if (action.type === 'set_page') {
    return {
      ...state,
      page: action.payload.page,
      from: (action.payload.page - 1) * state.limit + 1,
      to: action.payload.page * state.limit,
    };
  }
}

export function Requests({
  requests,
  layout,
  onAddRequestToFavourites,
  onRemoveRequestFromFavourites,
  onMakeDonationClick,
}) {
  const [pagination, updatePagination] = useReducer(paginationReducer, {
    page: 1,
    from: 0,
    to: PAGINATION_LIMIT,
    limit: PAGINATION_LIMIT,
    total: requests.length,
    pagesCount: Math.ceil(requests.length / PAGINATION_LIMIT),
  });
  const [filteredRequests, setFilteredRequests] = useState([]);

  const changePage = useCallback(
    (page) => {
      updatePagination({ type: 'set_page', payload: { page } });
      setFilteredRequests(
        requests.filter(
          (_, index) =>
            index + 1 >= pagination.from && index + 1 <= pagination.to
        )
      );
    },
    [requests, pagination.from, pagination.to]
  );

  useEffect(() => {
    changePage(1);
  }, [changePage]);

  return (
    <div className={cx('requests-wrapper')}>
      <div className={cx(['requests', `requests--${layout}`])}>
        {filteredRequests.map((request) => (
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
          boundaryCount={3}
          count={pagination.pagesCount}
          onChange={(_, page) => changePage(page)}
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
