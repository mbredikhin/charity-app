import { LoginCredentials } from '@/types';
import apiService from './api.service';

class AuthorizationService {
  async login(credentials: LoginCredentials): Promise<string> {
    const response: { data: string } = await apiService.http.post(
      '/auth/login',
      credentials
    );
    return response.data;
  }
}

export default new AuthorizationService();
