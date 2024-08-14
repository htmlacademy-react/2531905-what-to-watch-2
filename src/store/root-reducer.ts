import {combineReducers} from '@reduxjs/toolkit';
import {userSlice} from '@/store/user/user';
import {filmSlice} from '@/store/film/film';

export const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [filmSlice.name]: filmSlice.reducer,
});
