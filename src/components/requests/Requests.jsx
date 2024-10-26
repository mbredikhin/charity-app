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
  onDonate,
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
  }, [changePage, filteredRequests]);

  return (
    <div className={cx('requests-wrapper')}>
      <div className={cx(['requests', `requests--${layout}`])}>
        {filteredRequests.map((request) => (
          <RequestCard
            view="large"
            key={request.id}
            id={request.id}
            title={request.title}
            organization={request.organization.title}
            goalDescription={request.goalDescription}
            endingDate={request.endingDate}
            locationCity={request.location.city}
            locationDistrict={request.location.district}
            isHelpOnline={request.helperRequirements.isOnline}
            contributorsCount={request.contributorsCount}
            requestGoal={request.requestGoal}
            requestGoalCurrentValue={request.requestGoalCurrentValue}
            isFavourite={request.isFavourite}
            requesterType={request.requesterType}
            helpType={request.helpType}
            addToFavourite={() => onAddRequestToFavourites(request.id)}
            removeFromFavourites={() =>
              onRemoveRequestFromFavourites(request.id)
            }
            onDonate={() => onDonate(request.id)}
          />
        ))}
      </div>
      <Pagination
        color="primary"
        size="large"
        boundaryCount={3}
        count={pagination.pagesCount}
        onChange={(_, page) => changePage(page)}
      />
    </div>
  );
}

Requests.propTypes = {
  requests: pt.arrayOf(RequestType).isRequired,
  layout: pt.oneOf(['vertical', 'horizontal']).isRequired,
  onAddRequestToFavourites: pt.func.isRequired,
  onRemoveRequestFromFavourites: pt.func.isRequired,
  onDonate: pt.func.isRequired,
};
