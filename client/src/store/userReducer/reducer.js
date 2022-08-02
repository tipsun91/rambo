/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const URL = '/api/sign/in/';
const URL2 = '/api/user/';

export const signIn = createAsyncThunk(
  '/api/sign/in',
  async (event, { rejectWithValue }) => {
    try {
      const responce = await fetch(URL, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: event.target.email.value,
          password: event.target.password.value,
        }),
      });
      const data = await responce.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const editUser = createAsyncThunk(
  '/api/user',
  async (event, { rejectWithValue }) => {
    try {
      const responce = await fetch(URL2, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: event.target.name.value,
          email: event.target.email.value,
          password: event.target.password.value,
        }),
      });
      const data = await responce.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
  },
  reducers: {},
  extraReducers: {
    [signIn.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [signIn.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.user = action.payload.user;
    },
  },
});

export default userSlice.reducer;
