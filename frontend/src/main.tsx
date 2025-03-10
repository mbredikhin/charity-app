import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
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
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material';
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
    secondary: {
      main: '#a2a2a2',
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <RouterProvider router={router} />
      </StyledEngineProvider>
    </ThemeProvider>
  </StrictMode>
);
