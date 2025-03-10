import apiService from '@/api/api.service';
import authorizationService from '@/api/authorization.service';
import { createAsyncAction } from '@/hooks';
import { Set } from '.';

interface AuthState {
  auth: {
    data: {
      isAuthenticated: boolean;
    };
    loading: boolean;
    error: Error | null;
  };
}

export interface AuthSlice extends AuthState {
  setAuth: (data: AuthState['auth']['data']) => void;
  signIn: (credentials: {
    email: string;
    password: string;
  }) => Promise<{ isAuthenticated: true }>;
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
