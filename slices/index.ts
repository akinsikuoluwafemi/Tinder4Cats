import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import layoutReducer from './layoutSlice';
import catDataReducer from './catDataSlice';
import userReducer from './userSlice';

export const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['catData', 'userData'],
};

const rootReducer = combineReducers({
  layout: layoutReducer,
  catData: catDataReducer,
  userData: userReducer,
});

export default persistReducer(persistConfig, rootReducer);
