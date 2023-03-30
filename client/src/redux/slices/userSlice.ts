import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signInThunk, signUpThunk } from './../thunks/userThunk';
import type User from './../../types/UserType';

type UserState = {
  token: string | null;
  userId: string | null;
  username: string | null;
  status: 'init' | 'loading' | 'success' | 'error';
  status2: 'init' | 'loading' | 'success' | 'error';
  message: string | unknown;
  errorAuth: string | unknown;
  errorRegistr: string | unknown;
};

const initialState: UserState = {
  token: localStorage.getItem('token'),
  userId: localStorage.getItem('userId'),
  username: localStorage.getItem('username'),
  status: 'init',
  status2: 'init',
  message: '',
  errorAuth: '',
  errorRegistr: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: (state) => {
      localStorage.clear();
      state.token = null;
      state.userId = null;
      state.username = null;
      state.status = 'init';
    },
    clearStatus : (state) => {
      state.status2 = 'init'
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signInThunk.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'success';
        state.token = action.payload.token;
        state.userId = action.payload.userId;
        state.username = action.payload.username;
      })
      .addCase(signInThunk.rejected, (state, action) => {
        state.status = 'error';
        state.errorAuth = action.payload;
      })
      .addCase(signUpThunk.pending, (state) => {
        state.status2 = 'loading';
      })
      .addCase(signUpThunk.fulfilled, (state) => {
        state.errorRegistr = null;
        state.status2 = 'success';
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.errorRegistr = action.payload;
        state.status2 = 'error';
      });
  },
});

export default userSlice.reducer;
export const { logOut, clearStatus } = userSlice.actions;
