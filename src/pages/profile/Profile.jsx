import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  CircularProgress,
  Paper,
  Tab,
  Tabs,
  Badge,
  Typography,
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
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
  const { profile, loading, error: fetchProfileError } = useSelector((state) => state.profile);
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

  const [getRequests, , requestsError] = useRequest(async () => {
    const requests = await catalogService.getCatalog();
    console.log(`11${JSON.stringify(requestsError)}`);
    console.log(`22${JSON.stringify(requests)}`);
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

  // иногда данные профиля не загружены к этому моменту
  useEffect(() => {
    const favouriteRequests = requests.filter((request) => {
      if (profile.favouriteRequests) {
        return profile.favouriteRequests.includes(request.id);
      }
    }
    );
    setFavouriteRequests(favouriteRequests);
  }, [profile.favouriteRequests, requests]);

  const tabs = [
    {
      label: 'Личные данные',
      component: <ProfilePersonalInfo profile={profile} />,
      isDataFetchedWithError: fetchProfileError, 
    },
    {
      label: 'Контакты',
      component: <Contacts contacts={profile.contacts} />,
      isDataFetchedWithError: fetchProfileError, 
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
      isDataFetchedWithError: requestsError, 
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
              <Tabs
                value={tabIndex}
                onChange={(_, index) => setTabIndex(index)}
              >
                {tabs.map((tab, index) => ( 
                  <Tab 
                    key={index} 
                    label={ tab.isDataFetchedWithError
                      ? <Badge badgeContent={'!'} color="error" style={{opacity: "50%"}}>{tab.label}</Badge> 
                      : tab.label} />
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

