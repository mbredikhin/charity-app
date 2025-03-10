import apiService from './api.service';

class AuthorizationService {
  async signIn(data: { email: string; password: string }): Promise<string> {
    const response: { data: string } = await apiService.http.post(
      '/auth/login',
      data
    );
    return response.data;
  }
}

export default new AuthorizationService();
