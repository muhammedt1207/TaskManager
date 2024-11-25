import { createSlice } from "@reduxjs/toolkit";
import { fetchUserData, loginUser, logoutUser, registerUser } from "../actions/AuthActions";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
    },
    extraReducers: (builder) => {
      builder
        .addCase(loginUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.loading = false;
          state.isAuthenticated = true;
          state.user = action.payload.user;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.error;
        })
        .addCase(registerUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(registerUser.fulfilled, (state) => {
          state.loading = false;
        })
        .addCase(registerUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(fetchUserData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchUserData.fulfilled, (state, action) => {
          state.loading = false;
          state.isAuthenticated = true;
          state.user = action.payload.user;
        })
        .addCase(fetchUserData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.user = null;
          state.isAuthenticated = false;
        })
        .addCase(logoutUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(logoutUser.fulfilled, (state, action) => {
          state.loading = false;
          state.isAuthenticated = false;
          state.user = null;
        })
        .addCase(logoutUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.user = null;
          state.isAuthenticated = false;
        });
    },
  });
  
  export const { logout } = authSlice.actions;
  export default authSlice.reducer