import { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  Paper,
  Tab,
  Tabs,
  Badge,
  Typography,
} from '@mui/material';
import { useStore } from '@/store';
import { useShallow } from 'zustand/react/shallow';
import {
  Contacts,
  ProfileCard,
  Requests,
  ProfilePersonalInfo,
} from '@/components';
import { toList } from '@/utils/common';

export function Profile() {
  const [
    profile,
    isLoadingProfile,
    fetchProfile,

    catalog,
    favouriteRequestsIds,
    isLoadingCatalog,
    catalogError,

    areLoadingFavouriteRequests,
    favouriteRequestsError,
    addRequestToFavourites,
    removeRequestFromFavourites,
  ] = useStore(
    useShallow((state) => [
      state.profile.data,
      state.profile.loading,
      state.fetchProfile,

      state.catalog.data.requests,
      state.catalog.data.favouritesIds,
      state.catalog.loading,
      state.catalog.error,

      state.favouriteRequests.loading,
      state.favouriteRequests.error,
      state.addRequestToFavourites,
      state.removeRequestFromFavourites,
    ])
  );
  const favouriteRequests = toList(catalog, favouriteRequestsIds);

  const [tabIndex, setTabIndex] = useState(0);

  function changeTab(index) {
    if (!tabs[index].disabled) {
      setTabIndex(index);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  const tabs = [
    {
      label: 'Личные данные',
      component: <ProfilePersonalInfo profile={profile} />,
    },
    {
      label: 'Контакты',
      component: <Contacts contacts={profile.contacts} />,
    },
    {
      label: 'Избранное',
      component: favouriteRequests.length ? (
        <Requests
          layout="vertical"
          requests={favouriteRequests}
          onAddRequestToFavourites={addRequestToFavourites}
          onRemoveRequestFromFavourites={removeRequestFromFavourites}
          onMakeDonationClick={() => {
            // TODO
          }}
        />
      ) : null,
      disabled: isLoadingCatalog || areLoadingFavouriteRequests,
      error: catalogError || favouriteRequestsError,
    },
  ];

  return (
    <div>
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        Мой профиль
      </Typography>
      {isLoadingProfile ? (
        <CircularProgress />
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 4fr',
            gap: '20px',
          }}
        >
          <ProfileCard profile={profile} />
          <Paper
            variant="outlined"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '30px',
              padding: '10px 36px',
              minHeight: '982px',
            }}
          >
            <Box
              sx={{
                maxWidth: 'fit-content',
                display: 'inline-flex',
                borderBottom: 1,
                borderColor: 'divider',
              }}
            >
              <Tabs value={tabIndex} onChange={(_, index) => changeTab(index)}>
                {tabs.map((tab, index) => (
                  <Tab
                    key={index}
                    disabled={tab.disabled}
                    label={
                      tab.error ? (
                        <Badge
                          badgeContent="!"
                          color="error"
                          style={{ opacity: '50%' }}
                        >
                          {tab.label}
                        </Badge>
                      ) : (
                        tab.label
                      )
                    }
                  />
                ))}
              </Tabs>
            </Box>
            <Box>{tabs[tabIndex].component}</Box>
          </Paper>
        </Box>
      )}
    </div>
  );
}
