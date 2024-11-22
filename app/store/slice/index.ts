/*
 * combines all th existing reducers
 */

import {combineReducers} from '@reduxjs/toolkit';
import mapPinSlice from './mapPinSlice';

const reducers = {
  user: mapPinSlice,
};

// Exports

const rootReducer = combineReducers(reducers);
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
