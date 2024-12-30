import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { Request, RequestCard } from '@/components';
import { useStore } from '@/store';
import { useShallow } from 'zustand/react/shallow';

function RequestPage() {
  const { requestId } = useParams();
  const [
    request,
    isLoadingCatalog,
    addRequestToFavourites,
    removeRequestFromFavourites,
  ] = useStore(
    useShallow((state) => [
      state.catalog.data.requests[requestId],
      state.catalog.loading,
      state.addRequestToFavourites,
      state.removeRequestFromFavourites,
    ])
  );

  return (
    <div>
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        Запрос на помощь
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '4fr 1fr',
          gap: '20px',
        }}
      >
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
              onMakeDonationClick={() => {
                // TODO
              }}
            />
          </>
        ) : null}
      </Box>
    </div>
  );
}

export { RequestPage as Request };
