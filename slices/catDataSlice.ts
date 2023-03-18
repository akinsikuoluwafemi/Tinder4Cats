import { Cat } from './../types/globalTypes';
import { RootState } from './../store';
import { Breed, CatDataState } from '../types/globalTypes';
import { useEnvVars } from '@/utils/useEnvVars';
import {
  AsyncThunkAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';

// const  { API_KEY, API_ENDPOINT } = useEnvVars();

// const url = https://api.thecatapi.com/v1/images/search?limit=1&breed_ids=beng&api_key=live_f93xV39EEX3VvT72oZLAERkqKUGReJUR69zRe61BusTqO0vogbte4SCoGpj4mQkL

// const url = `${API_ENDPOINT}/images/search?limit=1&breed_ids=beng&api_key=${API_KEY}`;

// const allbreedsUrl = `${API_ENDPOINT}/v1/breeds/`;

const initialState: CatDataState = {
  breeds: {},
  randomBreed: {},
  randomBreedId: 0,
  randomCat: [],
  loading: false,
  error: null,
};

// Action to get cat breed
export const getCatBreed = createAsyncThunk(
  'catData/getCatBreed',
  async (endpoint: string, thunkAPI) => {
    try {
      const { data } = await axios.get(`${endpoint}/v1/breeds/`);
      return data.map((item: Breed) => {
        return {
          [item.id]: {
            id: item.id,
            name: item.name,
            description: item.description,
            origin: item.origin,
            temperament: item.temperament,
          },
        };
      });
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

// Action to get cats by random breed
export const getRandomCat = createAsyncThunk(
  'catData/getRandomCat',
  async (
    obj: { endpoint: string; breed_id: string; api_key: string },
    thunkAPI,
  ) => {
    try {
      const { data } = await axios.get(
        `${obj.endpoint}/v1/images/search?limit=1&breed_ids=${obj.breed_id}&api_key=${obj.api_key}`,
      );
      return data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

const catDataSlice = createSlice({
  name: 'catData',
  initialState,
  reducers: {
    setCatError: (state, action: PayloadAction) => {
      state.loading = false;
      state.error = action.payload;
    },
    setCatLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setRandomBreed: (state, action) => {
      state.randomBreed = action.payload;
    },
    setRandomBreedId: (state, action) => {
      state.randomBreedId = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getCatBreed.fulfilled, (state, action) => {
      state.loading = false;
      state.breeds = action.payload;
      state.error = null;
    });
    builder.addCase(getCatBreed.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getCatBreed.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getRandomCat.fulfilled, (state, action) => {
      state.loading = false;
      state.randomCat = action.payload;
      state.error = null;
    });

    builder.addCase(getRandomCat.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(getRandomCat.pending, (state, action) => {
      state.loading = true;
    });
  },
});

export const { setCatError, setCatLoading, setRandomBreed, setRandomBreedId } =
  catDataSlice.actions;

export const selectCatBreed = (state: RootState) => state.catData.breeds;

export const selectRandomBreed = (state: RootState) =>
  state.catData.randomBreed;

export const selectRandomBreedId = (state: RootState) =>
  state.catData.randomBreedId;

export const selectRandomCat = (state: RootState) => state.catData.randomCat;

export const selectCatLoading = (state: RootState) => state.catData.loading;

export default catDataSlice.reducer;
