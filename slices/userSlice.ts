import { User, UserDataState, UserSubmitForm } from './../types/globalTypes';
import { RootState } from '../store';
import {
  AsyncThunkAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState: UserDataState = {
  user: null || ({} as any),
  token: '',
  loading: false,
  error: null,
};

// action to register user
export const registerUser = createAsyncThunk(
  'userData/registerUser',
  async (user: UserSubmitForm, thunkAPI) => {
    const url = process.env.development
      ? `/api/signup/`
      : `${process.env['NEXT_PUBLIC_API_ENDPOINT_PROD']}/signup/`;
    try {
      const { data } = await axios.post(url, {
        email: user.email,
        password: user.password,
        username: user.username,
      });
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({ error: err.message });
    }
  },
);

export const loginUser = createAsyncThunk(
  'userData/loginUser',
  async (user: UserSubmitForm, thunkAPI) => {
    const url = process.env.development
      ? `/api/login/`
      : `${process.env['NEXT_PUBLIC_API_ENDPOINT_PROD']}/api/login/`;
    try {
      const { data } = await axios.post(url, {
        email: user.email,
        password: user.password,
      });
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({ error: err.message });
    }
  },
);

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUserError(state, action: PayloadAction<string | null>) {
      state.loading = false;
      state.error = action.payload;
    },
    setUserLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as { message: ''; success: false };
    });
    builder.addCase(registerUser.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as { message: ''; success: false };
    });
    builder.addCase(loginUser.pending, (state, action) => {
      state.loading = true;
    });
  },
});

export const { setUserError, setUserLoading, setUser, setToken } =
  userDataSlice.actions;

export const selectUser = (state: RootState) => state.userData.user;

export const selectUserLoading = (state: RootState) => state.userData.loading;

export default userDataSlice.reducer;
