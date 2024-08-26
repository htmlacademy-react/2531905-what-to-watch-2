import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from './root-reducer';
import api from '@/services/api';
import {router} from '@/router';

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
