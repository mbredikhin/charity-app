import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { Request, RequestCard } from '@/components';
import { useStore } from '@/store';
import { useShallow } from 'zustand/react/shallow';
import { donationNotify } from '@/utils/common';
import styles from './Request.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

function RequestPage() {
  const { requestId = 0 } = useParams();
  const [
    request,
    isLoadingCatalog,
    addRequestToFavourites,
    removeRequestFromFavourites,
  ] = useStore(
    useShallow((state) => [
      state.catalog.data.requests[+requestId],
      state.catalog.loading,
      state.addRequestToFavourites,
      state.removeRequestFromFavourites,
    ])
  );

  return (
    <Box>
      <Typography className={cx('request__title')} variant="h4">
        Запрос на помощь
      </Typography>

      <Box className={cx('request-content')}>
        {request && !isLoadingCatalog ? (
          <>
            <Request
              request={request}
              onAddToFavourites={addRequestToFavourites}
              onRemoveFromFavourites={removeRequestFromFavourites}
            />
            <RequestCard
              layout="compact"
              request={request}
              onAddToFavourites={addRequestToFavourites}
              onRemoveFromFavourites={removeRequestFromFavourites}
              onMakeDonationClick={donationNotify}
            />
          </>
        ) : null}
      </Box>
    </Box>
  );
}

export { RequestPage as Request };
