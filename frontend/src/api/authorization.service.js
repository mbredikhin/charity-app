import apiService from './api.service.js';

class AuthorizationService {
  async signIn(data) {
    const { token } = await apiService.http.post('/api/auth', data);
    return token;
  }
}

export default new AuthorizationService();
