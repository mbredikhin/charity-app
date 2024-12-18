import { useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { CatalogFilters, CatalogSearch, Requests } from '@/components';
import ServerError from '@/assets/images/server-error.svg?react';
import catalogService from '@/api/catalog.service';
import { useNavigate } from 'react-router-dom';
import { flatten, get } from '@/utils/common';
import { useRequest } from '@/hooks';
import type { CatalogFilters as ICatalogFilters, Request } from '@/types';

const getInitialFilters = (): ICatalogFilters => ({
  requesterType: [],
  helpType: [],
  helperRequirements: {
    helperType: [],
    isOnline: [],
    qualification: [],
  },
});

function filterRequests(
  search: string,
  filters: ICatalogFilters,
  requests: Request[]
) {
  return requests.filter((request) => {
    const isMatchedBySearch =
      !search || request.title.toLowerCase().includes(search.toLowerCase());
    const isMatchedByFilters = Object.entries(flatten(filters)).every(
      ([path, value]: [string, (string | boolean)[]]) =>
        !value.length || value.includes(get(request, path))
    );
    return isMatchedBySearch && isMatchedByFilters;
  });
}

export function Catalog() {
  const [search, setSearch] = useState<string>(null);
  const [filters, setFilters] = useState(getInitialFilters());
  const [requests, setRequests] = useState<Request[]>([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const navigate = useNavigate();

  const [
    addRequestToFavourites,
    // isLoadingAddRequestToFavourites,
    // addingRequestToFavouritesError,
  ] = useRequest(async (id: string) => {
    await catalogService.addRequestToFavourites(id);
    const index = requests.findIndex((request) => request.id === id);
    if (index !== -1) {
      setRequests([
        ...requests.slice(0, index),
        { ...requests[index], isFavourite: true },
        ...requests.slice(index + 1),
      ]);
    }
  });

  const [
    removeRequestFromFavourites,
    // isLoadingRemoveRequestFromFavourites,
    // removingRequestFromFavouritesError,
  ] = useRequest(async (id: string) => {
    await catalogService.removeRequestFromFavourites(id);
    const index = requests.findIndex((request) => request.id === id);
    if (index !== -1) {
      setRequests([
        ...requests.slice(0, index),
        { ...requests[index], isFavourite: false },
        ...requests.slice(index + 1),
      ]);
    }
  });

  const [getCatalog, isLoadingCatalog, catalogError] = useRequest(async () => {
    const requests = await catalogService.getCatalog();
    setRequests(requests);
    return requests;
  });

  function changeSearch(search: string) {
    setSearch(search);
    submit(search, filters, requests);
  }

  function changeFilters(filters: ICatalogFilters) {
    setFilters(filters);
    submit(search, filters, requests);
  }

  function resetFilters() {
    changeFilters(getInitialFilters());
  }

  function submit(
    search: string,
    filters: ICatalogFilters,
    requests: Request[]
  ) {
    const filteredRequests = filterRequests(search, filters, requests);
    setFilteredRequests(filteredRequests);
  }

  async function fetchCatalog() {
    const requests = await getCatalog();
    submit(search, filters, requests);
  }

  useEffect(() => {
    fetchCatalog();
  }, []);

  return (
    <div>
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        Запросы о помощи
      </Typography>
      <Box
        sx={{ display: 'grid', gridTemplateColumns: '1fr 4fr', gap: '20px' }}
      >
        <CatalogFilters
          filters={filters}
          onChange={changeFilters}
          onReset={resetFilters}
        />
        <Box
          sx={{ display: 'grid', gridTemplateRows: '150px auto', gap: '20px' }}
        >
          <CatalogSearch onChange={changeSearch} />
          {catalogError && !isLoadingCatalog ? (
            <Paper variant="outlined">
              <Box
                sx={{
                  height: '500px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <ServerError />
              </Box>
            </Paper>
          ) : (
            <Paper
              variant="outlined"
              sx={{
                padding: '20px',
              }}
            >
              <Requests
                layout="vertical"
                requests={filteredRequests}
                onAddRequestToFavourites={addRequestToFavourites}
                onRemoveRequestFromFavourites={removeRequestFromFavourites}
                onMakeDonationClick={() => {
                  // TODO
                }}
              />
            </Paper>
          )}
        </Box>
      </Box>
    </div>
  );
}
