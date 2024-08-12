import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {AppRoute} from '@/constants';
import Main from '@/pages/main/main';
import Login from '@/pages/login/login';
import MyList from '@/pages/my-list/my-list';
import Film from '@/pages/film/film';
import Review from '@/pages/review/review';
import Player from '@/pages/player/player';
import NotFound from '@/pages/not-found/not-found';
import ErrorBoundary from '@/components/error-boundary/error-boundary';
import PrivateRoute from '@/components/private-route/private-route.tsx';

function App() {
  const router = createBrowserRouter([
    {
      path: AppRoute.MainPage,
      element: <Main />,
      errorElement: <ErrorBoundary />
    },
    {
      path: AppRoute.LoginPage,
      element: <Login />,
      errorElement: <ErrorBoundary />
    },
    {
      path: AppRoute.MyListPage,
      element:
        <PrivateRoute>
          <MyList />
        </PrivateRoute>,
      errorElement: <ErrorBoundary />
    },
    {
      path: AppRoute.FilmPage,
      element: <Film />,
      errorElement: <ErrorBoundary />
    },
    {
      path: AppRoute.ReviewPage,
      element:
        <PrivateRoute>
          <Review />
        </PrivateRoute>,
      errorElement: <ErrorBoundary />
    },
    {
      path: AppRoute.PlayerPage,
      element: <Player />,
      errorElement: <ErrorBoundary />
    },
    {
      path: AppRoute.NotFoundPage,
      element: <NotFound />,
      errorElement: <ErrorBoundary />
    },
    {
      path: AppRoute.DefaultPage,
      element: <NotFound />,
      errorElement: <ErrorBoundary />,
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
