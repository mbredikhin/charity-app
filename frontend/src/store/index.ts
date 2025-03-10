import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { AuthSlice, createAuthSlice } from './auth';
import { createProfileSlice, ProfileSlice } from './profile';
import { CatalogSlice, createCatalogSlice } from './catalog';

interface Store extends AuthSlice, CatalogSlice, ProfileSlice {}

export type Set<S = Store> = (f: (store: S) => void) => void;

const middlewares = (f: StateCreator<Store>) => devtools(immer(f));

export const useStore = create<Store>()(
  middlewares((set) => ({
    ...createAuthSlice(set as Set),
    ...createProfileSlice(set as Set),
    ...createCatalogSlice(set as Set),
  }))
);
