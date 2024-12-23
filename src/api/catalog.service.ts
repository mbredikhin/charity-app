import apiService from './api.service';
import { Request } from '@/types';

class CatalogService {
  async getCatalog(): Promise<Request[]> {
    return apiService.http.get('/api/request');
  }

  async getRequest(id: string): Promise<Request> {
    return apiService.http.get(`/api/request/${id}`);
  }

  async getFavouriteRequests(): Promise<Request['id'][]> {
    return apiService.http.get('/api/user/favourites');
  }

  async addRequestToFavourites(requestId: string) {
    return apiService.http.post('/api/user/favourites', { requestId });
  }

  async removeRequestFromFavourites(requestId: string) {
    return apiService.http.delete(`/api/user/favourites/${requestId}`);
  }
}

export default new CatalogService();
