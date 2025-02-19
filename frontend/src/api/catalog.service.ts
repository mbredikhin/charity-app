import apiService from './api.service';
import { RequestDto } from '@/entities/request';

class CatalogService {
  async getCatalog(): Promise<RequestDto[]> {
    const { data } = await apiService.http.get('/api/requests');
    return data;
  }

  async getRequest(id: RequestDto['id']): Promise<RequestDto> {
    const { data }: { data: RequestDto } = await apiService.http.get(
      `/api/requests/${id}`
    );
    return data;
  }

  async getFavouriteRequests(): Promise<RequestDto['id'][]> {
    const { data }: { data: RequestDto['id'][] } = await apiService.http.get(
      '/api/requests/favourites'
    );
    return data;
  }

  async addRequestToFavourites(id: RequestDto['id']) {
    return apiService.http.post('/api/requests/favourites', { id });
  }

  async removeRequestFromFavourites(id: RequestDto['id']) {
    return apiService.http.delete('/api/requests/favourites', {
      data: { id },
    });
  }
}

export default new CatalogService();
