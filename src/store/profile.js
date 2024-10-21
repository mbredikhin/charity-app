import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import profileService from '@/api/profile.service.js';

export const fetchProfile = createAsyncThunk('profile/fetch', async () => {
  return await profileService.getProfile();
});

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: {},
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.pending, (state) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    });
    builder.addCase(fetchProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error?.message;
    });
  },
});

export default profileSlice.reducer;
