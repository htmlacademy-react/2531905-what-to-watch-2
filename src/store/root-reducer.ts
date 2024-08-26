import {combineReducers} from '@reduxjs/toolkit';
import {userSlice} from '@/store/user/user';
import {filmSlice} from '@/store/film/film';
import {reviewSlice} from '@/store/review/review';

export const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [filmSlice.name]: filmSlice.reducer,
  [reviewSlice.name]: reviewSlice.reducer,
});
