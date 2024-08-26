import Header from '@/components/header/header';
import ReviewForm from '@/components/review-form/review-form';
import {Await, useLoaderData} from 'react-router-dom';
import {FilmFull} from '@/types';
import {Suspense} from 'react';
import Loader from '@/components/loader/loader';

type LoadedData = {
  film: FilmFull;
}

function Review() {
  const data = useLoaderData() as LoadedData;

  return (
    <Suspense fallback={<Loader />}>
      <Await resolve={data.film}>
        {(film: FilmFull) => (
          <section className="film-card film-card--full" style={{backgroundColor: film.backgroundColor}}>
            <div className="film-card__header">
              <div className="film-card__bg">
                <img src={film.backgroundImage} alt={film.name}/>
              </div>

              <h1 className="visually-hidden">WTW</h1>

              <Header/>

              <div className="film-card__poster film-card__poster--small">
                <img src={film.posterImage} alt={`${film.name} poster`} width="218" height="327"/>
              </div>
            </div>

            <div className="add-review">
              <ReviewForm filmId={film.id}/>
            </div>

          </section>
        )}
      </Await>
    </Suspense>
  );
}

export default Review;
