import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import profileService from '@/api/profile.service.js';

export const fetchProfile = createAsyncThunk('profile/fetch', async () => {
  return await profileService.getProfile();
});

const initialState = {
  profile: {},
  loading: false,
  error: null,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
      state.error = null;
    });
    builder.addCase(fetchProfile.rejected, (state, action) => {
      state.loading = false;
      state.profile = initialState;
      state.error = action.error?.message;
    });
  },
});

export default profileSlice.reducer;
