import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { store } from './store';
import {
  Layout,
  Home,
  Profile,
  Posts,
  NotFound,
  Playground,
  Catalog,
} from './pages';
import '@/assets/styles/index.scss';
import { createTheme, ThemeProvider } from '@mui/material';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/posts',
        element: <Posts />,
      },
      {
        path: '/playground',
        element: <Playground />,
      },
      {
        path: '/catalog',
        element: <Catalog />,
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

const LightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={LightTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
