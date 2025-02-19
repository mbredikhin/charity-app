import apiService from './api.service';
import { createProfile, Profile, ProfileDto } from '@/entities/profile';

class ProfileService {
  async getProfile(): Promise<Profile> {
    const response: ProfileDto = await apiService.http.get('/api/user');
    return createProfile(response);
  }
}

export default new ProfileService();
