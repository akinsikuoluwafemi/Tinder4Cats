import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface LayoutState {
  isLayoutActive: boolean;
}

const initialState: LayoutState = {
  isLayoutActive: true,
};

const useSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    toggleLayout: (state) => {
      state.isLayoutActive = !state.isLayoutActive;
    },
  },
});

export const { toggleLayout } = useSlice.actions;

export const selectLayout = (state: RootState) => state.layout.isLayoutActive;

export default useSlice.reducer;
