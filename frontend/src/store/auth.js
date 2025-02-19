import apiService from '@/api/api.service.js';
import authorizationService from '@/api/authorization.service.js';
import { createAsyncAction } from '@/hooks';

const initialState = {
  auth: {
    data: {
      isAuthenticated: false,
    },
    loading: false,
    error: null,
  },
};

export const createAuthSlice = (set) => ({
  ...initialState,
  setAuth: (data) => {
    set(({ auth }) => {
      auth.data = data;
    });
  },
  signIn: createAsyncAction(
    (f) => set(({ auth }) => f(auth)),
    async (credentials) => {
      const token = await authorizationService.signIn(credentials);
      apiService.addHeader({
        name: 'Authorization',
        value: `Bearer ${token}`,
      });
      localStorage.setItem('token', token);
      return { isAuthenticated: true };
    }
  ),
  signOut: () => {
    localStorage.removeItem('token');
    set(({ auth }) => {
      auth.data.isAuthenticated = false;
    });
  },
});
