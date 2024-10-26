import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { store } from './store';
import { Layout, Home, Profile, Posts, NotFound, Playground } from './pages';
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
      { path: '*', element: <NotFound /> },
    ],
  },
]);

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
