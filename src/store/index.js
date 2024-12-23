import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createAuthSlice } from './auth.js';
import { createProfileSlice } from './profile.js';

const middlewares = (f) => devtools(immer(f));

export const useStore = create()(
  middlewares((...args) => ({
    ...createAuthSlice(...args),
    ...createProfileSlice(...args),
  }))
);
