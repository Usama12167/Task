// src/store/store.js
import {configureStore} from '@reduxjs/toolkit';
import pinsSlice from './slice/mapPinSlice';

export const store = configureStore({
  reducer: {
    pins: pinsSlice,
  },
});
