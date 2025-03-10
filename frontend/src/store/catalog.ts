import catalogService from '@/api/catalog.service';
import { createAsyncAction } from '@/hooks';
import { toDictionary } from '@/utils/common';
import { Set } from '.';
import { Request } from '@/entities/request';

interface CatalogState {
  catalog: {
    data: {
      ids: Request['id'][];
      favouritesIds: Request['id'][];
      requests: Record<Request['id'], Request>;
    };
    loading: boolean;
    error: Error | null;
  };
  favouriteRequests: {
    loading: boolean;
    error: Error | null;
  };
}

export interface CatalogSlice extends CatalogState {
  getCatalog: () => Promise<CatalogState['catalog']['data']>;
  addRequestToFavourites: (requestId: Request['id']) => Promise<unknown>;
  removeRequestFromFavourites: (requestId: Request['id']) => Promise<unknown>;
}

const initialState: CatalogState = {
  catalog: {
    data: {
      ids: [],
      favouritesIds: [],
      requests: {},
    },
    loading: false,
    error: null,
  },
  favouriteRequests: {
    loading: false,
    error: null,
  },
};

export const createCatalogSlice = (set: Set): CatalogSlice => ({
  ...initialState,
  getCatalog: createAsyncAction(
    (f) => set(({ catalog }) => f(catalog)),
    async () => {
      const [catalog, favouritesIds] = await Promise.all([
        catalogService.getCatalog(),
        catalogService.getFavouriteRequests(),
      ]);
      const [requests, ids] = toDictionary(catalog, 'id', (request) => ({
        ...request,
        is_favourite: favouritesIds.includes(request.id),
      }));
      return {
        ids,
        favouritesIds,
        requests,
      } as CatalogState['catalog']['data'];
    }
  ),
  addRequestToFavourites: createAsyncAction(
    (f) => set(({ favouriteRequests }) => f(favouriteRequests)),
    async (requestId) => {
      const response = await catalogService.addRequestToFavourites(requestId);
      set((state) => {
        state.catalog.data.requests[requestId].is_favourite = true;
        state.catalog.data.favouritesIds.push(requestId);
      });
      return response;
    }
  ),
  removeRequestFromFavourites: createAsyncAction(
    (f) => set(({ favouriteRequests }) => f(favouriteRequests)),
    async (requestId) => {
      const response =
        await catalogService.removeRequestFromFavourites(requestId);
      set((state) => {
        state.catalog.data.requests[requestId].is_favourite = false;
        state.catalog.data.favouritesIds =
          state.catalog.data.favouritesIds.filter((id) => id !== requestId);
      });
      return response;
    }
  ),
});
