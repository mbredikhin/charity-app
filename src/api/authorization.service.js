import ApiService from './api.service.js';

class AuthorizationService {
  async signIn(data) {
    const response = await ApiService.http.post('/api/auth', data);
    localStorage.setItem('token', response.token);
    ApiService.addHeader({
      name: 'Authorization',
      value: `Bearer ${response.token}`,
    });
  }
}

export default new AuthorizationService();
