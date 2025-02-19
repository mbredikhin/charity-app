import apiService from './api.service.js';

class AuthorizationService {
  async signIn(data) {
    const response = await apiService.http.post('/auth/login', data);
    return response.data;
  }
}

export default new AuthorizationService();
