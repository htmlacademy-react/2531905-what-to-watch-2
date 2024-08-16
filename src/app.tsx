import {RouterProvider} from 'react-router-dom';
import { Provider } from '@rollbar/react';
import { ToastContainer } from 'react-toastify';
import {router} from '@/router';
import {ROLLBAR_CONFIG} from '@/constants';

import 'react-toastify/dist/ReactToastify.min.css';

function App() {

  return (
    <Provider config={ROLLBAR_CONFIG}>
      <ToastContainer theme="dark" />
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
