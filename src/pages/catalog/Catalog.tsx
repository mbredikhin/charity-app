import { useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { CatalogFilters, CatalogSearch, Requests } from '@/components';
import ServerError from '@/assets/images/server-error.svg?react';
import { flatten, get, toList } from '@/utils/common';
import type { CatalogFilters as ICatalogFilters } from '@/types';
import { useStore } from '@/store';
import { useShallow } from 'zustand/react/shallow';
import { Request } from '@/entities/request';

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
  const catalog = useStore((state) => state.catalog.data.requests);
  const [
    catalogIds,
    isLoadingCatalog,
    catalogError,
    addRequestToFavourites,
    removeRequestFromFavourites,
  ] = useStore(
    useShallow((state) => [
      state.catalog.data.ids,
      state.catalog.loading,
      state.catalog.error,
      state.addRequestToFavourites,
      state.removeRequestFromFavourites,
    ])
  );
  const [search, setSearch] = useState<string>(null);
  const [filters, setFilters] = useState(getInitialFilters());

  const requests = toList(catalog, catalogIds);
  const filteredRequests = filterRequests(search, filters, requests);

  function resetFilters() {
    setFilters(getInitialFilters());
  }

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
          onChange={setFilters}
          onReset={resetFilters}
        />
        <Box
          sx={{ display: 'grid', gridTemplateRows: '150px auto', gap: '20px' }}
        >
          <CatalogSearch onChange={setSearch} />
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
              {requests.length && !isLoadingCatalog ? (
                <Requests
                  layout="vertical"
                  requests={filteredRequests}
                  onAddRequestToFavourites={addRequestToFavourites}
                  onRemoveRequestFromFavourites={removeRequestFromFavourites}
                  onMakeDonationClick={() => {
                    // TODO
                  }}
                />
              ) : null}
            </Paper>
          )}
        </Box>
      </Box>
    </div>
  );
}
