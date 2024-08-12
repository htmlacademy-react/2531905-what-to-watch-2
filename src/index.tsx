import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';

import App from '@/components/app/app';
import {store} from '@/store';
import {checkAuth} from '@/store/user/api-actions';
import {getFilms, getPromo} from '@/store/film/api-actions';

await store.dispatch(checkAuth());
store.dispatch(getFilms());
store.dispatch(getPromo());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
