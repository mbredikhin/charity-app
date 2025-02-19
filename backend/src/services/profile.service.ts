import {
  profileRepository,
  ProfileRepository,
} from '@/repositories/profile.repository';

export class ProfileService {
  constructor(private repository: ProfileRepository) {}

  async getProfile(userId: number) {
    const profile = await this.repository.findProfile(userId);
    return profile;
  }
}

export const profileService = new ProfileService(profileRepository);
