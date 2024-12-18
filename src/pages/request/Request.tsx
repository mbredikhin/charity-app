import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import catalogService from '@/api/catalog.service';
import { Request, RequestCard } from '@/components';
import { useRequest } from '@/hooks';
import type { Request as IRequest } from '@/types';
import { routes } from '@/utils/constants';

function RequestPage() {
  const { requestId } = useParams();
  const [request, setRequest] = useState<IRequest>(null);
  const navigate = useNavigate();

  const [getRequest, isLoadingRequest, requestError] = useRequest(
    async (id: string) => {
      const request = await catalogService.getRequest(id);
      setRequest(request);
      setRequest({ ...request, isFavourite: false });
    }
  );

  const [
    addRequestToFavourites,
    // isLoadingAddRequestToFavourites,
    // addingRequestToFavouritesError,
  ] = useRequest(async (id: string) => {
    await catalogService.addRequestToFavourites(id);
    setRequest({ ...request, isFavourite: true });
  });

  const [
    removeRequestFromFavourites,
    // isLoadingRemoveRequestFromFavourites,
    // removingRequestFromFavouritesError,
  ] = useRequest(async (id: string) => {
    await catalogService.removeRequestFromFavourites(id);
    setRequest({ ...request, isFavourite: false });
  });

  const [
    getFavouriteRequests,
    // areLoadingFavouriteRequests,
    // favouriteRequestsError,
  ] = useRequest(async () => {
    const favourites = await catalogService.getFavouriteRequests();
    return favourites;
  });

  async function init() {
    getRequest(requestId);
    getFavouriteRequests().then((favourites) => {
      setRequest({ ...request, isFavourite: favourites.includes(request.id) });
    });
  }

  useEffect(() => {
    init();
  }, []);

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
        {request && !isLoadingRequest ? (
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
