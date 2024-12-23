import profileService from '@/api/profile.service.js';
import { createAsyncAction } from '@/hooks';

const initialState = {
  profile: {
    data: {},
    loading: false,
    error: null,
  },
};

export const createProfileSlice = (set) => ({
  ...initialState,
  fetchProfile: createAsyncAction(
    (f) => set(({ profile }) => f(profile)),
    async () => {
      const profile = await profileService.getProfile();
      return profile;
    }
  ),
});
