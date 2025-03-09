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
  ProfilePersonalData,
  RequestsLayoutButtonGroup,
} from '@/components';
import { toList, donationNotify } from '@/utils/common';

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

  const [layout, setLayout] = useState<'vertical' | 'horizontal' | 'map'>(
    'vertical'
  );
  const [tabIndex, setTabIndex] = useState(0);

  function changeTab(index) {
    if (!tabs[index].disabled) {
      setTabIndex(index);
    }
  }
  const isFavouritesTabActive = tabIndex === 2;

  useEffect(() => {
    fetchProfile();
  }, []);

  const tabs = [
    {
      label: 'Личные данные',
      component: <ProfilePersonalData profile={profile} />,
    },
    {
      label: 'Контакты',
      component: (
        <Contacts contacts={profile.contacts} socials={profile.socials} />
      ),
    },
    {
      label: 'Избранное',
      component: (
        <Requests
          layout={layout}
          requests={favouriteRequests}
          onAddRequestToFavourites={addRequestToFavourites}
          onRemoveRequestFromFavourites={removeRequestFromFavourites}
          onMakeDonationClick={() => {
            donationNotify();
          }}
        />
      ),
      disabled: isLoadingCatalog || areLoadingFavouriteRequests,
      error: catalogError || favouriteRequestsError,
    },
  ];

  return (
    <div>
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        Мой профиль
      </Typography>
      {isLoadingProfile || !profile.full_name ? (
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
              padding: '12px 36px',
              minHeight: '982px',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box
                sx={{
                  maxWidth: 'fit-content',
                  display: 'inline-flex',
                  borderBottom: 1,
                  borderColor: 'divider',
                }}
              >
                <Tabs
                  value={tabIndex}
                  onChange={(_, index) => changeTab(index)}
                >
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
              {isFavouritesTabActive ? (
                <RequestsLayoutButtonGroup
                  layout={layout}
                  changeLayout={setLayout}
                />
              ) : null}
            </Box>
            <Box>{tabs[tabIndex].component}</Box>
          </Paper>
        </Box>
      )}
    </div>
  );
}
