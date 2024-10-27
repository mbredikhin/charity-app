import ApiService from './api.service';

class CatalogService {
  async getCatalog() {
    return ApiService.http.get('/api/request');
  }

  async getRequest(id) {
    return ApiService.http.get(`/api/request/${id}`);
  }

  async getFavouriteRequests() {
    return ApiService.http.get('/api/user/favourites');
  }

  async addRequestToFavourites(requestId) {
    return ApiService.http.post('/api/user/favourites', { requestId });
  }

  async removeRequestFromFavourites(requestId) {
    return ApiService.http.delete(`/api/user/favourites/${requestId}`);
  }
}

export default new CatalogService();
