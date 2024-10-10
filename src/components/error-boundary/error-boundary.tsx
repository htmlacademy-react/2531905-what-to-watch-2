import { useRollbar } from '@rollbar/react';
import {Link, useRouteError} from 'react-router-dom';
import Header from '@/components/header/header';

import classes from './error-boundary.module.css';
import {AppRoute} from '@/constants';

function ErrorBoundary() {
  const rollbar = useRollbar();
  const error = useRouteError() as Error;
  const message = error?.message || 'Something went wrong. Try again later';
  rollbar.error('Error occurred', message);

  return (
    <div className="user-page">
      <Header className="user-page__head"/>

      <section className="catalog">
        <div className={classes.mainBlock}>
          <img src="/img/error.png" height="370" width="370"/>
          <p>{message}</p>
          <Link to={AppRoute.MainPage} className="catalog__button">Go to main page</Link>
        </div>
      </section>
    </div>
  );
}

export default ErrorBoundary;
