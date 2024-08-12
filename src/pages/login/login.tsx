import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import LoginForm from '@/components/login-form/login-form';
import {useAppSelector} from '@/hooks/use-app-selector';
import {getIsUserAuthorized} from '@/store/user/selectors';
import {Navigate} from 'react-router-dom';
import {AppRoute} from '@/constants';

function Login() {
  const isUserAuthorized = useAppSelector(getIsUserAuthorized);

  if (isUserAuthorized) {
    return <Navigate to={AppRoute.MainPage} />;
  }

  return (
    <div className="user-page">
      <Header className="user-page__head" isTitle />

      <div className="sign-in user-page__content">
        <LoginForm />
      </div>

      <Footer />
    </div>
  );
}

export default Login;
