import {Link, useNavigate} from 'react-router-dom';
import {AppRoute} from '@/constants';
import {useAppDispatch} from '@/hooks/use-app-dispatch';
import {logout} from '@/store/user/api-actions';
import {useAppSelector} from '@/hooks/use-app-selector';
import {getUser} from '@/store/user/selectors';

function UserNav() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);

  const handleLogoutClick = () => {
    const payload = {
      onSuccess: () => {
        navigate(AppRoute.MainPage);
      }
    };
    dispatch(logout(payload));
  };

  return (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <Link to={AppRoute.MyListPage}>
            <img src={user?.avatarUrl} alt="User avatar" width="63" height="63"/>
          </Link>
        </div>
      </li>
      <li className="user-block__item">
        <a className="user-block__link" onClick={handleLogoutClick}>
          Sign out
        </a>
      </li>
    </ul>
  );
}

export default UserNav;
