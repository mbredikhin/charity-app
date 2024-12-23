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
import {
  Contacts,
  ProfileCard,
  Requests,
  ProfilePersonalInfo,
} from '@/components';
import catalogService from '@/api/catalog.service';
import { useRequest } from '@/hooks';

export function Profile() {
  const profile = useStore((state) => state.profile.data);
  const loading = useStore((state) => state.profile.loading);
  const error = useStore((state) => state.profile.error);
  const fetchProfile = useStore((state) => state.fetchProfile);

  const [requests, setRequests] = useState([]);
  const [favouriteRequests, setFavouriteRequests] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);

  const [addRequestToFavourites] = useRequest(async (id) => {
    await catalogService.addRequestToFavourites(id);
    setFavouriteRequests([
      ...favouriteRequests,
      requests.find((request) => request.id === id),
    ]);
  });

  const [removeRequestFromFavourites] = useRequest(async (id) => {
    await catalogService.removeRequestFromFavourites(id);
    const index = favouriteRequests.findIndex((request) => request.id === id);
    if (index !== -1) {
      setFavouriteRequests([
        ...favouriteRequests.slice(0, index),
        ...favouriteRequests.slice(index + 1),
      ]);
    }
  });

  const [getRequests, areLoadingRequests, getRequestsError] = useRequest(
    async () => {
      const requests = await catalogService.getCatalog();
      setRequests(requests);
    }
  );

  function changeTab(index) {
    if (!tabs[index].disabled) {
      setTabIndex(index);
    }
  }

  function init() {
    fetchProfile();
    getRequests();
  }

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const favouriteRequests = requests.filter((request) =>
      profile.favouriteRequests?.includes(request.id)
    );
    setFavouriteRequests(favouriteRequests);
  }, [profile.favouriteRequests, requests]);

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
      component: (
        <Requests
          layout="vertical"
          requests={favouriteRequests}
          onAddRequestToFavourites={addRequestToFavourites}
          onRemoveRequestFromFavourites={removeRequestFromFavourites}
          onMakeDonationClick={() => {
            // TODO
          }}
        />
      ),
      disabled: areLoadingRequests,
      error: error || getRequestsError,
    },
  ];

  return (
    <div>
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        Мой профиль
      </Typography>
      {loading ? (
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
