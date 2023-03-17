import { combineReducers } from "@reduxjs/toolkit";
import layoutReducer from "./layoutSlice";

export const rootReducer = combineReducers({
  layout: layoutReducer,
});
