import {Link} from 'react-router-dom';
import {AppRoute} from '@/constants';

type SignInProps = {
  isTitle: boolean;
}

function signInBlock({isTitle = false}: SignInProps) {
  return isTitle
    ? <h1 className="page-title user-page__title">Sign in</h1>
    : (
      <div className="user-block">
        <Link to={AppRoute.LoginPage} className="user-block__link">Sign in</Link>
      </div>
    );
}

export default signInBlock;
