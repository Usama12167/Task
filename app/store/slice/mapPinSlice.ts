import {createSlice} from '@reduxjs/toolkit';
import {AppState} from 'model/reducers/types';

const initialState: AppState = {
  currentRouteName: '',
  isDark: false,
  message: {},
};
export const appSlice = createSlice({
  name: 'pins',
  initialState,
  reducers: {
    addPin: (state: AppState, action) => {
      return {
        ...state,
        pin: action.payload,
      };
    },
   
  
  },
});

export const {addPin} =
mapPinSlice.actions;

export default mapPinSlice.reducer;
