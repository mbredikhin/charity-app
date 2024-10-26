import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Paper, Typography } from '@mui/material';
import { CatalogFilters, CatalogSearch, Requests } from '@/components';
import CatalogService from '@/api/catalog.service.js';
import ServerError from '@/assets/images/server-error.svg?react';

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
    search.toLowerCase().includes(request.title.toLowerCase()),
  requesterType: (filterValue, request) =>
    request.requesterType === filterValue,
  helpType: (filterValue, request) => request.helpType === filterValue,
  helperRequirements: (entries, request) =>
    Object.entries(entries).every(
      (key, value) => !value || value === request.helperRequirements[key]
    ),
  endingDate: (filterValue, request) =>
    !filterValue || filterValue < request.endingDate,
};

const filterRequests = (requests, filters) =>
  requests.filter((request) =>
    Object.entries(filters).every(
      (key, filterValue) =>
        filterValue === null || filtersPredicates[key](filterValue, request)
    )
  );

export function Catalog({ layout }) {
  const [filters, setFilters] = useState(initialFilters);
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  function changeFilters(payload) {
    setFilters({ ...filters, ...payload });
    setFilteredRequests(filterRequests(requests));
  }

  const fetchCatalog = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      const requests = await CatalogService.getCatalog();
      setRequests(requests);
      setFilteredRequests(filterRequests(requests));
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
            <Requests layout={layout} requests={filteredRequests} />
          )}
        </Box>
      </Box>
    </div>
  );
}

Catalog.propTypes = {
  layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
};
