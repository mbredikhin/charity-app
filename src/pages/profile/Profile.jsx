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
  const tabs = [
    {
      label: 'Личные данные',
      component: <div>ProfilePersonalInfo</div>,
      // component: <ProfilePersonalInfo profile={profile} />,
    },
    {
      label: 'Контакты',
      component: <div>ProfileContacts</div>,
      // component: <ProfilePersonalInfo contacts={profile.contacts} />,
    },
    {
      label: 'Избранное',
      component: <div>ProfileFavourites</div>,
      // component: <ProfileFavourites favourites={profile.favouriteRequests} />,
    },
  ];
  const [tabIndex, setTabIndex] = useState(0);
  // const { profile, loading } = useSelector((state) => state.profile);
  const { loading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

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
          <Paper
            variant="outlined"
            sx={{
              padding: '10px 36px',
              height: '425px',
            }}
          ></Paper>
          {/* <ProfileCard
            name={`${profile.name} ${profile.lastName}`}
            status={profile.status}
          /> */}
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
