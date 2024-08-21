import {RouterProvider} from 'react-router-dom';
import {Suspense} from 'react';
import { Provider } from '@rollbar/react';
import { ToastContainer } from 'react-toastify';
import {router} from '@/router';
import {ROLLBAR_CONFIG} from '@/constants';

import 'react-toastify/dist/ReactToastify.min.css';

function App() {

  return (
    <Provider config={ROLLBAR_CONFIG}>
      <ToastContainer theme="dark" />
      <Suspense fallback={<p>Loading data...</p>}>
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  );
}

export default App;
