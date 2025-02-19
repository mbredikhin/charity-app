import apiService from './api.service';
import { createProfile, Profile, ProfileDto } from '@/entities/profile';

class ProfileService {
  async getProfile(): Promise<Profile> {
    const { data }: { data: ProfileDto } =
      await apiService.http.get('/api/profile');
    return createProfile(data);
  }
}

export default new ProfileService();
