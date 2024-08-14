import {RouterProvider} from 'react-router-dom';
import { Provider } from '@rollbar/react';
import {router} from '@/router';

const rollbarConfig = {
  accessToken: '2b3774040e63470fa37a2ce179b6d7b9',
  environment: 'testenv',
};

function App() {

  return (
    <Provider config={rollbarConfig}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
