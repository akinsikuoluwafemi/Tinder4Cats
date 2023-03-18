import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import layoutReducer from './layoutSlice';
import catDataReducer from './catDataSlice';

export const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['catData'],
};

const rootReducer = combineReducers({
  layout: layoutReducer,
  catData: catDataReducer,
});

export default persistReducer(persistConfig, rootReducer);
