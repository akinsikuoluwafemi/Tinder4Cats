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
    try {
      const { data } = await axios.post('/api/signup/', {
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
    try {
      const { data } = await axios.post('/api/login/', {
        email: user.email,
        password: user.password,
      });
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({ error: err.message });
    }
  },
);

export const authFavCat = createAsyncThunk(
  'userData/authFavCat',
  async (user: any, thunkAPI: any) => {
    try {
      const { token } = thunkAPI.getState()?.userData;
      console.log(token);

      const response = await axios.post(
        'api/favorites/',
        {
          userId: user.id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log('good');
      console.log(response);
      return response;

      // const { data } = await axios.post(
      //   '/api/favorites/',
      //   {
      //     userId: user.userId,
      //     token: user.token,
      //     // apikey: user.apikey,
      //     // image_id: user.image_id,
      //     // sub_id: user.userId,
      //   },
      //   {
      //     headers: {
      //       'Content-Type': 'application/json',
      //       Authorization: `Bearer ${user.token}`,
      //       // 'x-api-key': `${user.apikey}`,
      //     },
      //   },
      // );
      // console.log(data);

      // return data;

      //  // like here
      //  const apikey = req.headers['x-api-key'];
      //  console.log(apikey);

      //  const { data } = await axios.post(
      //    'https://api.thecatapi.com/v1/favourites',
      //    {
      //      image_id,
      //      sub_id,
      //    },
      //    {
      //      headers: {
      //        'x-api-key': apikey,
      //      },
      //    },
      //  );
    } catch (err: any) {
      console.log(err);
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

    builder.addCase(authFavCat.fulfilled, (state: any, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload;
    });
    builder.addCase(authFavCat.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as { message: ''; success: false };
    });
    builder.addCase(authFavCat.pending, (state, action) => {
      state.loading = true;
    });
  },
});

export const { setUserError, setUserLoading, setUser, setToken } =
  userDataSlice.actions;

export const selectUser = (state: RootState) => state.userData.user;

export const selectUserLoading = (state: RootState) => state.userData.loading;

export default userDataSlice.reducer;
