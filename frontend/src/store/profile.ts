import profileService from '@/api/profile.service';
import { ProfileDto } from '@/entities/profile';
import { createAsyncAction } from '@/hooks';
import { Set } from '.';

interface ProfileState {
  profile: {
    data: ProfileDto | {};
    loading: boolean;
    error: Error | null;
  };
}

export interface ProfileSlice extends ProfileState {
  fetchProfile: () => Promise<ProfileState['profile']['data']>;
}

const initialState: ProfileState = {
  profile: {
    data: {},
    loading: false,
    error: null,
  },
};

export const createProfileSlice = (set: Set) => ({
  ...initialState,
  fetchProfile: createAsyncAction(
    (f) => set(({ profile }) => f(profile)),
    async () => {
      const profile = await profileService.getProfile();
      return profile;
    }
  ),
});
