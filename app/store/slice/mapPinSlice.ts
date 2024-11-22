import {createSlice} from '@reduxjs/toolkit';

export const mapPinSlice = createSlice({
  name: 'pins',
  initialState: [],
  reducers: {
    addPin: (state, action) => {
      state.push(action.payload);
    },
    removePin: (state, action) => {
      return state.filter((_, index) => index !== action.payload);
    },
  },
});

export const {addPin, removePin} = mapPinSlice.actions;

export default mapPinSlice.reducer;
