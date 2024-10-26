import ApiService from './api.service';

class CatalogService {
  async getCatalog() {
    return ApiService.http.get('/api/catalog');
  }
}

export default new CatalogService();
