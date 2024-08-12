import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '@/constants';
import {userSlice} from '@/store/user/user';
import {filmSlice} from '@/store/film/film';

export const rootReducer = combineReducers({
  [NameSpace.User]: userSlice.reducer,
  [NameSpace.Film]: filmSlice.reducer,
});
