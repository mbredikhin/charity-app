import { configureStore } from '@reduxjs/toolkit';
import profileSlice from './profile';
import authorizationSlice from './authorization.js';

export const store = configureStore({
  reducer: {
    profile: profileSlice,
    authorization: authorizationSlice,
  },
});

export * from './authorization';
export * from './profile';
