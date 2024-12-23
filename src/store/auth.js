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

const token = localStorage.getItem('token');
if (token) {
  apiService.addHeader({
    name: 'Authorization',
    value: `Bearer ${token}`,
  });
  initialState.auth.data.isAuthenticated = true;
}

export const createAuthSlice = (set) => ({
  ...initialState,
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
