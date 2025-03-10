import apiService from '@/api/api.service';
import authorizationService from '@/api/authorization.service';
import { createAsyncAction } from '@/hooks';
import { Set } from '.';
import { ApiError, LoginCredentials } from '@/types';

interface AuthState {
  auth: {
    data: {
      isAuthenticated: boolean;
    };
    loading: boolean;
    error: ApiError | null;
  };
}

export interface AuthSlice extends AuthState {
  setAuth: (data: AuthState['auth']['data']) => void;
  login: (credentials: LoginCredentials) => Promise<AuthState['auth']['data']>;
  resetError: () => void;
  signOut: () => void;
}

const initialState: AuthState = {
  auth: {
    data: {
      isAuthenticated: false,
    },
    loading: false,
    error: null,
  },
};

export const createAuthSlice = (set: Set): AuthSlice => ({
  ...initialState,
  setAuth: (data) => {
    set(({ auth }) => {
      auth.data = data;
    });
  },
  login: createAsyncAction(
    (f) => set(({ auth }) => f(auth)),
    async (credentials) => {
      const token = await authorizationService.login(credentials);
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
  resetError: () => {
    set(({ auth }) => {
      auth.error = null;
    });
  },
});
