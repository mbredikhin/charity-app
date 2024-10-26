import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authorizationService from '@/api/authorization.service.js';

export const signIn = createAsyncThunk('authorization/signIn', async (data) => {
  const response = await authorizationService.signIn(data);
  return response;
});

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState: {
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    updateIsAuthenticated: (state, { payload }) => {
      return {
        ...state,
        isAuthenticated: payload,
      };
    },
    signOut: (state) => {
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(signIn.fulfilled, (state) => {
      state.loading = false;
      state.isAuthenticated = true;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export const { signOut, updateIsAuthenticated } = authorizationSlice.actions;

export default authorizationSlice.reducer;
