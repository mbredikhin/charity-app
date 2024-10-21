import { configureStore } from '@reduxjs/toolkit';
import profileSlice from './profile';

export const store = configureStore({
  reducer: {
    profile: profileSlice,
  },
});

export * from './profile';
