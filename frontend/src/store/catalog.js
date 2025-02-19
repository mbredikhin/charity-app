import catalogService from '@/api/catalog.service';
import { createAsyncAction } from '@/hooks';
import { toDictionary } from '@/utils/common';

const initialState = {
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

export const createCatalogSlice = (set) => ({
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
        isFavourite: favouritesIds.includes(request.id),
      }));
      return {
        ids,
        favouritesIds,
        requests,
      };
    }
  ),
  addRequestToFavourites: createAsyncAction(
    (f) => set(({ favouriteRequests }) => f(favouriteRequests)),
    async (requestId) => {
      await catalogService.addRequestToFavourites(requestId);
      set((state) => {
        state.catalog.data.requests[requestId].isFavourite = true;
        state.catalog.data.favouritesIds.push(requestId);
      });
    }
  ),
  removeRequestFromFavourites: createAsyncAction(
    (f) => set(({ favouriteRequests }) => f(favouriteRequests)),
    async (requestId) => {
      await catalogService.removeRequestFromFavourites(requestId);
      set((state) => {
        state.catalog.data.requests[requestId].isFavourite = false;
        state.catalog.data.favouritesIds =
          state.catalog.data.favouritesIds.filter((id) => id !== requestId);
      });
    }
  ),
});
