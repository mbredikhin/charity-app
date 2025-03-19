import { useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import {
  CatalogFilters,
  CatalogSearch,
  Requests,
  RequestsLayoutButtonGroup,
} from '@/components';
import ServerError from '@/assets/images/server-error.svg?react';
import { flatten, get, toList, donationNotify } from '@/utils/common';
import type { CatalogFilters as ICatalogFilters } from '@/types';
import { useStore } from '@/store';
import { useShallow } from 'zustand/react/shallow';
import { Request } from '@/entities/request';
import styles from './Catalog.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

const getInitialFilters = (): ICatalogFilters => ({
  requester_type: [],
  help_type: [],
  helper_requirements: {
    helper_type: [],
    is_online: [],
    qualification: [],
  },
});

function filterRequests(
  search: string | null,
  filters: ICatalogFilters,
  requests: Request[]
) {
  return requests.filter((request) => {
    const isMatchedBySearch =
      !search || request.title.toLowerCase().includes(search.toLowerCase());
    const isMatchedByFilters = (
      Object.entries(flatten(filters)) as [string, (string | boolean)[]][]
    ).every(
      ([path, value]) => !value.length || value.includes(get(request, path))
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
  const [search, setSearch] = useState<string | null>(null);
  const [filters, setFilters] = useState(getInitialFilters());
  const [layout, setLayout] = useState<'vertical' | 'horizontal' | 'map'>(
    'vertical'
  );

  const requests = toList(catalog, catalogIds);
  const filteredRequests = filterRequests(search, filters, requests);

  function resetFilters() {
    setFilters(getInitialFilters());
  }

  return (
    <Box>
      <Typography className={cx('catalog__title')} variant="h4">
        Запросы о помощи
      </Typography>
      <Box className={cx('catalog-content')}>
        <CatalogFilters
          filters={filters}
          onChange={setFilters}
          onReset={resetFilters}
        />
        <Box className={cx('catalog-main-content')}>
          <CatalogSearch onChange={setSearch} />
          {catalogError && !isLoadingCatalog ? (
            <Paper variant="outlined">
              <Box className={cx('catalog-error')}>
                <ServerError />
              </Box>
            </Paper>
          ) : (
            <Paper
              className={cx('catalog-requests-wrapper')}
              variant="outlined"
            >
              <Box className={cx('catalog-requests')}>
                <Typography variant="h6">
                  Найдено: {filteredRequests.length}
                </Typography>
                <RequestsLayoutButtonGroup
                  layout={layout}
                  changeLayout={setLayout}
                />
              </Box>
              {requests.length && !isLoadingCatalog ? (
                <Requests
                  layout={layout}
                  requests={filteredRequests}
                  onAddRequestToFavourites={addRequestToFavourites}
                  onRemoveRequestFromFavourites={removeRequestFromFavourites}
                  onMakeDonationClick={() => {
                    donationNotify();
                  }}
                />
              ) : null}
            </Paper>
          )}
        </Box>
      </Box>
    </Box>
  );
}
