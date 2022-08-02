/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const SIGN_IN_URL = '/api/sign/in/';
const SIGN_UP_URL = '/api/sign/up/';
const URL2 = '/api/user/';

export const signData = createAsyncThunk(
  '/api/sign/in',
  async (event, { rejectWithValue }) => {
    try {
      const responce = await fetch(SIGN_IN_URL, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await responce.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const signIn = createAsyncThunk(
  '/api/sign/in',
  async (event, { rejectWithValue }) => {
    try {
      const responce = await fetch(SIGN_IN_URL, {
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

export const signUp = createAsyncThunk(
  '/api/sign/up',
  async (event, { rejectWithValue }) => {
    try {
      const responce = await fetch(SIGN_UP_URL, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: event.target.name.value,
          email: event.target.email.value,
          password: [event.target.password.value, event.target.pswdcfrm.value],
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
    [signData.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [signData.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.user = action.payload.user;
    },
    [signIn.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [signIn.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.user = action.payload.user;
    },
    [signUp.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [signUp.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.user = action.payload.user;
    },
  },
});

export default userSlice.reducer;
