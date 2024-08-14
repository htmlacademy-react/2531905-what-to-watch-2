import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from './root-reducer';
import {createAPI} from '@/services/api';
import {router} from '@/router';

export const api = createAPI();

const extraArgument = {
  api,
  router,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument,
      },
    }),
});
