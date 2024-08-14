import {RouterProvider} from 'react-router-dom';
import { Provider } from '@rollbar/react';
import {router} from '@/router';
import {ROLLBAR_CONFIG} from '@/constants';

function App() {

  return (
    <Provider config={ROLLBAR_CONFIG}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
