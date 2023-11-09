import { createAsyncThunk } from '@reduxjs/toolkit';
import type User from './../../types/UserType';

interface authData {
  username: string;
  password: string;
}

export const signInThunk = createAsyncThunk<User, authData, { rejectValue: string }>(
  'user/signIn',
  async ({ username, password }, { rejectWithValue }) => {
    const response = await fetch('https://stickytodos.onrender.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const user = await response.json();

    if (!response.ok) {
      return rejectWithValue(user);
    }

    localStorage.setItem('token', user.token);
    localStorage.setItem('userId', user.userId);
    localStorage.setItem('username', user.username);

    return user as User;
  },
);

export const signUpThunk = createAsyncThunk<unknown, authData, { rejectValue: string }>(
  'user/signUpThunk',
  async ({ username, password }, { rejectWithValue }) => {
    const response = await fetch('https://stickytodos.onrender.com/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return rejectWithValue(data);
    }

    console.log(data);

    return data;
  },
);
