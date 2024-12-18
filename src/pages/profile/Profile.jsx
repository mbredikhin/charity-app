import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  CircularProgress,
  Paper,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { fetchProfile } from '@/store';
import {
  Contacts,
  ProfileCard,
  Requests,
  ProfilePersonalInfo,
} from '@/components';
import catalogService from '@/api/catalog.service';
import { useRequest } from '@/hooks';

// {
//   "id": "user-id-1",
//   "name": "Александр",
//   "lastName": "Иванов",
//   "birthdate": "1950-07-23",
//   "status": "Начинающий",
//   "baseLocations": [
//     {
//       "latitude": 40.712776,
//       "longitude": -74.005974,
//       "district": "Центральный",
//       "city": "Москва"
//     }
//   ],
//   "educations": [
//     {
//       "organizationName": "МГУ",
//       "level": "Среднее общее",
//       "specialization": "Филология",
//       "graduationYear": 1980
//     }
//   ],
//   "additionalInfo": "Дополнительная информация о пользователе.",
//   "contacts": {
//     "email": "user@example.com",
//     "phone": "+123456789",
//     "social": {
//       "telegram": "@user",
//       "whatsapp": "+123456789",
//       "vk": "user_vk_id"
//     }
//   },
//   "favouriteRequests": [
//     "string"
//   ]
// }
export function Profile() {
  const { profile, loading } = useSelector((state) => state.profile);
  const [requests, setRequests] = useState([]);
  const [favouriteRequests, setFavouriteRequests] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const dispatch = useDispatch();

  const [
    addRequestToFavourites,
    // isLoadingAddRequestToFavourites,
    // addingRequestToFavouritesError,
  ] = useRequest(async (id) => {
    await catalogService.addRequestToFavourites(id);
    setFavouriteRequests([
      ...favouriteRequests,
      requests.find((request) => request.id === id),
    ]);
  });

  const [
    removeRequestFromFavourites,
    // isLoadingRemoveRequestFromFavourites,
    // removingRequestFromFavouritesError,
  ] = useRequest(async (id) => {
    await catalogService.removeRequestFromFavourites(id);
    const index = favouriteRequests.findIndex((request) => request.id === id);
    if (index !== -1) {
      setFavouriteRequests([
        ...favouriteRequests.slice(0, index),
        ...favouriteRequests.slice(index + 1),
      ]);
    }
  });

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
    },
  ];

  const [
    getRequests,
    // areLoadingRequests,
    // requestsError
  ] = useRequest(async () => {
    const requests = await catalogService.getCatalog();
    setRequests(requests);
  });

  function init() {
    dispatch(fetchProfile()).unwrap();
    getRequests();
  }

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const favouriteRequests = requests.filter((request) =>
      profile.favouriteRequests.includes(request.id)
    );
    setFavouriteRequests(favouriteRequests);
  }, [profile.favouriteRequests, requests]);

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
              <Tabs
                value={tabIndex}
                onChange={(_, index) => setTabIndex(index)}
              >
                {tabs.map((tab, index) => (
                  <Tab key={index} label={tab.label} />
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
