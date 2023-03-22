import { Provider } from 'react-redux';
import { rootReducer } from './slices';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import React, { ReactNode } from 'react';

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

const Wrapper = ({ children }: { children: ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Wrapper;
