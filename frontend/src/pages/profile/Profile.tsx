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
  ProfileContacts,
  ProfileCard,
  Requests,
  ProfilePersonalData,
  RequestsLayoutButtonGroup,
} from '@/components';
import { toList, donationNotify } from '@/utils/common';
import { Profile as IProfile } from '@/entities/profile';
import styles from './Profile.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

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
      state.profile.data as IProfile,
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

  function changeTab(index: number) {
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
        <ProfileContacts
          contacts={profile.contacts}
          socials={profile.socials}
        />
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
    <Box>
      <Typography className={cx('profile__title')} variant="h4">
        Мой профиль
      </Typography>
      {isLoadingProfile || !profile.full_name ? (
        <CircularProgress />
      ) : (
        <Box className={cx('profile-content')}>
          <ProfileCard profile={profile} />
          <Paper className={cx('profile-main-content')} variant="outlined">
            <Box className={cx('profile-main-content-header')}>
              <Box className={cx('profile-tabs')}>
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
    </Box>
  );
}
