import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import catalogService from '@/api/catalog.service';
import { Request, RequestCard } from '@/components';

function RequestPage() {
  const { requestId } = useParams();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchRequest(id) {
    try {
      setLoading(true);
      setError(null);
      const response = await catalogService.getRequest(id);
      setRequest(response);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  }

  async function addRequestToFavourites(id) {
    await catalogService.addRequestToFavourites(id);
    setRequest({ ...request, isFavourite: true });
  }

  async function removeRequestFromFavourites(id) {
    await catalogService.removeRequestFromFavourites(id);
    setRequest({ ...request, isFavourite: false });
  }

  async function fetchFavouriteRequests() {
    return catalogService.getFavouriteRequests();
  }

  useEffect(() => {
    fetchRequest(requestId);
    fetchFavouriteRequests().then((favourites) => {
      if ((favourites as unknown as string[]).includes(request.id)) {
        setRequest({ ...request, isFavourite: true });
      }
    });
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
        {request && !loading ? (
          <>
            <Request
              request={request}
              onAddToFavourites={addRequestToFavourites}
              onRemoveFromFavourites={removeRequestFromFavourites}
            />
            <RequestCard
              view="large"
              request={request}
              onAddToFavourites={addRequestToFavourites}
              onRemoveFromFavourites={removeRequestFromFavourites}
            />
          </>
        ) : null}
      </Box>
    </div>
  );
}

export { RequestPage as Request };
