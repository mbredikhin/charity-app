import { lazy } from 'react';
import { AppHeader } from './appHeader/AppHeader';
import { ProfileCard, ProfilePersonalData } from './profile';
import { LoginForm, Accounts } from './login';
import { Requests } from './requests/Requests';
import { CatalogFilters } from './catalog/CatalogFilters';
import { CatalogSearch } from './catalog/CatalogSearch';
import { PrivateRoute } from './privateRoute/PrivateRoute';
import { Contacts } from './contacts/Contacts';
import { Request } from './request/Request';
import { RequestCard } from './requestCard/RequestCard';
import { RequestsLayoutButtonGroup } from './requestsLayoutButtonGroup/RequestsLayoutButtonGroup';
import { FavoriteButton } from './favoriteButton/FavoriteButton';
const Map = lazy(() => import('./map/Map'));

export {
  AppHeader,
  ProfileCard,
  Requests,
  CatalogFilters,
  CatalogSearch,
  LoginForm,
  Accounts,
  Contacts,
  PrivateRoute,
  Request,
  RequestCard,
  RequestsLayoutButtonGroup,
  ProfilePersonalData,
  FavoriteButton,
  Map,
};
