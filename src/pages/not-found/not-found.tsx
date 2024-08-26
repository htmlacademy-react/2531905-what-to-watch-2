import {Link} from 'react-router-dom';

import Header from '@/components/header/header';
import classes from '@/components/error-boundary/error-boundary.module.css';
import {AppRoute} from '@/constants';

function NotFound() {
  return (
    <div className="user-page">
      <Header className="user-page__head"/>

      <section className="catalog">
        <div className={classes.mainBlock}>
          <img src="/img/error.png" height="370" width="370"/>
          <p>404. Page not found</p>
          <Link to={AppRoute.MainPage} className="catalog__button">Go to main page</Link>
        </div>
      </section>
    </div>
  );
}

export default NotFound;
