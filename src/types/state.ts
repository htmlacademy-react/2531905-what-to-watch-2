import {store} from '@/store';
import {AxiosInstance} from 'axios';
import {RejectedWithValueActionFromAsyncThunk} from '@reduxjs/toolkit/dist/matchers';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type ThunkOptions = {
  extra: AxiosInstance;
  dispatch?: AppDispatch;
  state?: State;
  rejectWithValue?: RejectedWithValueActionFromAsyncThunk<never>;
}
