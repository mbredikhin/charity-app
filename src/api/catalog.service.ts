import apiService from './api.service';
import { RequestDto } from '@/entities/request';

class CatalogService {
  async getCatalog(): Promise<RequestDto[]> {
    return apiService.http.get('/api/request');
  }

  async getRequest(id: string): Promise<RequestDto> {
    return apiService.http.get(`/api/request/${id}`);
  }

  async getFavouriteRequests(): Promise<RequestDto['id'][]> {
    return apiService.http.get('/api/user/favourites');
  }

  async addRequestToFavourites(requestId: RequestDto['id']) {
    return apiService.http.post('/api/user/favourites', { requestId });
  }

  async removeRequestFromFavourites(requestId: RequestDto['id']) {
    return apiService.http.delete(`/api/user/favourites/${requestId}`);
  }
}

export default new CatalogService();
