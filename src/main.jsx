import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { store } from './store';
import {
  Layout,
  Home,
  Profile,
  NotFound,
  Catalog,
  SignIn,
  Request,
} from './pages';
import { PrivateRoute } from './components';
import '@/assets/styles/index.scss';
import { createTheme, ThemeProvider } from '@mui/material';
import { routes } from './utils/constants';

const router = createBrowserRouter([
  {
    path: routes.home(),
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: routes.login(),
        element: <SignIn />,
      },
      {
        path: routes.profile(),
        element: <PrivateRoute Component={Profile} />,
      },
      {
        path: routes.catalog(),
        children: [
          { index: true, element: <PrivateRoute Component={Catalog} /> },
          {
            path: ':requestId',
            element: <PrivateRoute Component={Request} />,
          },
        ],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
