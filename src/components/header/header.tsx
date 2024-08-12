import {useAppSelector} from '@/hooks/use-app-selector';
import {getIsUserAuthorized} from '@/store/user/selectors';

import UserNav from '@/components/user-nav/user-nav';
import SignInBlock from '@/components/sign-in-block/sign-in-block';
import Logo from '@/components/logo/logo';

type HeaderProps = {
  className: string;
  isTitle?: boolean;
}

function Header({className = '', isTitle = false}: HeaderProps) {
  const isUserAuthorized = useAppSelector(getIsUserAuthorized);

  return (
    <header className={`page-header ${className}`}>
      <Logo />
      {
        isUserAuthorized ? <UserNav/> : <SignInBlock isTitle={isTitle} />
      }
    </header>
  );
}

export default Header;
