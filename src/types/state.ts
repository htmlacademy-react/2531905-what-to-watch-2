import {store} from '@/store';
import {AxiosInstance} from 'axios';
import {RouterType} from '@/router';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type ThunkOptions = {
  extra: {
    api: AxiosInstance;
    router: RouterType;
  };
  dispatch?: AppDispatch;
  state?: State;
  rejectWithValue?: () => void;
}
