export const routes = {
  home: () => '/',
  login: () => '/login',
  profile: () => '/profile',
  catalog: () => '/catalog',
  catalogRequest: (requestId) => `/catalog/${requestId}`,
};
