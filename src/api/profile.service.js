import ApiService from './api.service';

class ProfileService {
  async getProfile() {
    return ApiService.http.get('/api/user');
  }
}

export default new ProfileService();
