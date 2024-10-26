import * as pt from 'prop-types';
import { RequestType } from '@/types/request';
import styles from './Requests.module.scss';
import classnames from 'classnames/bind';
import { Pagination } from '@mui/material';
import { useCallback, useEffect, useReducer, useState } from 'react';
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
  // TODO: Use Request component
  // onAddRequestToFavourites,
  // onRemoveRequestFromFavourites,
  // onDonate,
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

  useEffect(() => {
    changePage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requests]);

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

  return (
    <div className={cx('requests-wrapper')}>
      <div className={cx(['requests', `requests--${layout}`])}>
        {filteredRequests.map((request) => (
          // TODO: Use Request component
          <div key={request.id}>{request.id}</div>
        ))}
      </div>
      <Pagination
        color="primary"
        size="large"
        boundaryCount={pagination.pagesCount}
        count={pagination.pagesCount}
        onChange={(_, page) => changePage(page)}
      />
    </div>
  );
}

Requests.propTypes = {
  requests: pt.arrayOf(RequestType).isRequired,
  layout: pt.oneOf(['vertical', 'horizontal']).isRequired,
  // TODO: Use Request component
  // onAddRequestToFavourites: pt.func.isRequired,
  // onRemoveRequestFromFavourites: pt.func.isRequired,
  // onDonate: pt.func.isRequired,
};
