import {Navigate} from 'react-router-dom';

import {AppRoute} from '@/constants';
// import {useAppSelector} from '@/hooks/use-app-selector';
// import {getIsUserAuthorized} from '@/store/user/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute({children}: PrivateRouteProps): JSX.Element {
  const isUserAuthorized = true; //useAppSelector(getIsUserAuthorized);

  return isUserAuthorized ? children : <Navigate to={AppRoute.LoginPage} />;
}

export default PrivateRoute;
