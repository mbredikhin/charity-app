import { useCallback, useEffect, useState } from 'react';
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
import { Contacts, ProfileCard, Requests } from '@/components';
import catalogService from '@/api/catalog.service';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const tabs = [
    {
      label: 'Личные данные',
      component: <div>ProfilePersonalInfo</div>,
      // component: <ProfilePersonalInfo profile={profile} />,
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
          onDonate={(id) => navigate(`/catalog/${id}`)}
        />
      ),
    },
  ];
  const [tabIndex, setTabIndex] = useState(0);
  const dispatch = useDispatch();

  async function addRequestToFavourites(id) {
    await catalogService.addRequestToFavourites(id);
    setFavouriteRequests([
      ...favouriteRequests,
      requests.find((request) => request.id === id),
    ]);
  }

  async function removeRequestFromFavourites(id) {
    await catalogService.removeRequestFromFavourites(id);
    const index = favouriteRequests.findIndex((request) => request.id === id);
    if (index !== -1) {
      setFavouriteRequests([
        ...favouriteRequests.slice(0, index),
        ...favouriteRequests.slice(index + 1),
      ]);
    }
  }

  const fetchCatalog = useCallback(async () => {
    const requests = await catalogService.getCatalog();
    setRequests(requests);
  }, []);

  useEffect(() => {
    (async () => {
      await dispatch(fetchProfile()).unwrap();
      await fetchCatalog();
      setFavouriteRequests(
        requests.filter((request) =>
          profile.favouriteRequests.includes(request.id)
        )
      );
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, fetchCatalog, setFavouriteRequests, profile.favouriteRequests]);

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
