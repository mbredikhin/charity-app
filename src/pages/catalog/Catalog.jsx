import { useCallback, useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { CatalogFilters, CatalogSearch, Requests } from '@/components';
import CatalogService from '@/api/catalog.service.js';
import ServerError from '@/assets/images/server-error.svg?react';
import catalogService from '@/api/catalog.service.js';
import { useNavigate } from 'react-router-dom';

const initialFilters = {
  search: null,
  requesterType: null,
  helpType: null,
  helperRequirements: {
    helperType: null,
    isOnline: null,
    qualification: null,
  },
};

const filtersPredicates = {
  search: (search, request) =>
    search === null ||
    search.toLowerCase().includes(request.title.toLowerCase()),
  requesterType: (filterValue, request) =>
    request.requesterType === null || request.requesterType === filterValue,
  helpType: (filterValue, request) =>
    request.helpType === null || request.helpType === filterValue,
  helperRequirements: (entries, request) =>
    Object.entries(entries).every(
      ([key, value]) =>
        value === null || value === request.helperRequirements[key]
    ),
};

const filterRequests = (requests, filters) =>
  requests.filter((request) =>
    Object.entries(filters).every(([key, filterValue]) => {
      return (
        filterValue === null || filtersPredicates[key](filterValue, request)
      );
    })
  );

export function Catalog() {
  const [filters, setFilters] = useState(initialFilters);
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function addRequestToFavourites(id) {
    await catalogService.addRequestToFavourites(id);
    const index = requests.findIndex((request) => request.id === id);
    if (index !== -1) {
      setRequests([
        ...requests.slice(0, index),
        { ...requests[index], isFavourite: true },
        ...requests.slice(index + 1),
      ]);
    }
  }

  async function removeRequestFromFavourites(id) {
    await catalogService.removeRequestFromFavourites(id);
    const index = requests.findIndex((request) => request.id === id);
    if (index !== -1) {
      setRequests([
        ...requests.slice(0, index),
        { ...requests[index], isFavourite: false },
        ...requests.slice(index + 1),
      ]);
    }
  }

  function changeFilters(payload) {
    setFilters({ ...filters, ...payload });
    setFilteredRequests(filterRequests(requests, filters));
  }

  const fetchCatalog = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      const requests = await CatalogService.getCatalog();
      setRequests(requests);
      setFilteredRequests(filterRequests(requests, filters));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  }, []);

  function resetFilters() {
    changeFilters({ ...initialFilters, search: filters.search });
  }

  useEffect(() => {
    fetchCatalog();
  }, [fetchCatalog]);

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
          <CatalogSearch onChange={(search) => changeFilters({ search })} />
          {error && !loading ? (
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
                onDonate={(id) => navigate(`/catalog/${id}`)}
              />
            </Paper>
          )}
        </Box>
      </Box>
    </div>
  );
}
