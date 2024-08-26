import {useAppSelector} from '@/hooks/use-app-selector';
import {getIsUserAuthorized} from '@/store/user/selectors';

import UserNav from '@/components/user-nav/user-nav';
import SignInBlock from '@/components/sign-in-block/sign-in-block';
import Logo from '@/components/logo/logo';
import {getFavoriteCount} from '@/store/film/selectors';

type HeaderProps = {
  className?: string;
  isTitle?: boolean;
  showList?: boolean;
}

function Header({className = '', isTitle = false, showList = false}: HeaderProps) {
  const isUserAuthorized = useAppSelector(getIsUserAuthorized);
  const favoriteCount = useAppSelector(getFavoriteCount);

  return (
    <header className={`page-header ${className}`}>
      <Logo/>
      {
        showList && (
          <h1 className="page-title user-page__title">
            My list <span className="user-page__film-count">{favoriteCount}</span>
          </h1>
        )
      }
      {
        isUserAuthorized ? <UserNav/> : <SignInBlock isTitle={isTitle}/>
      }
    </header>
  );
}

export default Header;
