import ApiService from './api.service';

class ProfileService {
  static id = 1;

  async getProfile() {
    return ApiService.http.get(`/users/${ProfileService.id}`);
  }

  async updateProfile(data) {
    return ApiService.http.put(`/users/${ProfileService.id}`, data);
  }
}

export default new ProfileService();
