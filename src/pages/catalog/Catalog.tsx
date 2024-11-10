import { useCallback, useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { CatalogFilters, CatalogSearch, Requests } from '@/components';
import CatalogService from '@/api/catalog.service.js';
import ServerError from '@/assets/images/server-error.svg?react';
import catalogService from '@/api/catalog.service.js';
import { useNavigate } from 'react-router-dom';
import { flatten, get } from '@/utils/common';

const getInitialFilters = () => ({
  requesterType: [],
  helpType: [],
  helperRequirements: {
    helperType: [],
    isOnline: [],
    qualification: [],
  },
});

function filterRequests(search, filters, requests) {
  return requests.filter((request) => {
    const isMatchedBySearch =
      search === null ||
      search.toLowerCase().includes(request.title.toLowerCase());
    const isMatchedByFilters = Object.entries(flatten(filters)).every(
      ([path, value]: [string, (string | boolean)[]]) =>
        !value.length || value.includes(get(request, path))
    );
    return isMatchedBySearch && isMatchedByFilters;
  });
}

export function Catalog() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState(getInitialFilters());
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

  const fetchCatalog = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      const requests = await CatalogService.getCatalog();
      setRequests(requests as unknown as any[]);
      setFilteredRequests(filterRequests(search, filters, requests));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  }, []);

  function changeSearch(search: string) {
    setSearch(search);
    submit();
  }

  function changeFilters(filters) {
    setFilters(filters);
    submit();
  }

  function resetFilters() {
    setFilters(getInitialFilters());
    submit();
  }

  function submit() {
    const filteredRequests = filterRequests(search, filters, requests);
    setFilteredRequests(filteredRequests);
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
          <CatalogSearch onChange={changeSearch} />
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
