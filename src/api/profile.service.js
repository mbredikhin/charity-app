import apiService from './api.service';

class ProfileService {
  async getProfile() {
    return apiService.http.get('/api/user');
  }
}

export default new ProfileService();
