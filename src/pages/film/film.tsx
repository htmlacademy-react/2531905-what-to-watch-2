import {Await, useLoaderData} from 'react-router-dom';
import {Suspense, useEffect, useState} from 'react';
import clsx from 'clsx';

import Header from '@/components/header/header';
import FilmDescription from '@/components/film-description/film-description';
import Card from '@/components/card/card';
import Footer from '@/components/footer/footer';
import FilmOverview from '@/components/film-overview/film-overview';
import FilmDetails from '@/components/film-details/film-details';
import FilmReviews from '@/components/film-reviews/film-reviews';
import {FilmFull, FilmListItem} from '@/types';
import Loader from '@/components/loader/loader';

type LoaderData = {
  film: FilmFull;
  similar: FilmListItem[];
}

const TABS = ['Overview', 'Details', 'Reviews'];

function Film() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const data = useLoaderData() as LoaderData;

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    setActiveTab(TABS[0]);
  }, [data]);

  return (
    <Suspense fallback={<Loader />}>
      <Await resolve={data.film}>
        {(film: FilmFull) => (
          <section className="film-card film-card--full" style={{backgroundColor: film.backgroundColor}} data-testid="film-page-container">
            <div className="film-card__hero">
              <div className="film-card__bg">
                <img src={film.backgroundImage} alt={film.name}/>
              </div>

              <h1 className="visually-hidden">WTW</h1>

              <Header className="film-card__head"/>

              <div className="film-card__wrap">
                <FilmDescription film={film}/>
              </div>
            </div>

            <div className="film-card__wrap film-card__translate-top">
              <div className="film-card__info">
                <div className="film-card__poster film-card__poster--big">
                  <img src={film.posterImage} alt={`${film.name} poster`} width="218" height="327"/>
                </div>

                <div className="film-card__desc">
                  <nav className="film-nav film-card__nav">
                    <ul className="film-nav__list">
                      {
                        TABS.map((tab) => (
                          <li
                            key={tab}
                            className={clsx('film-nav__item', activeTab === tab && 'film-nav__item--active')}
                            onClick={() => handleTabClick(tab)}
                          >
                            <a className="film-nav__link">{tab}</a>
                          </li>
                        ))
                      }
                    </ul>
                  </nav>
                  {
                    activeTab === 'Overview' && <FilmOverview film={film}/>
                  }
                  {
                    activeTab === 'Details' && <FilmDetails film={film}/>
                  }
                  {
                    activeTab === 'Reviews' && <FilmReviews filmId={film.id}/>
                  }
                </div>
              </div>
            </div>
          </section>
        )}
      </Await>
      <Await resolve={data.similar}>
        {(similar: FilmListItem[]) => (
          <div className="page-content">
            {
              similar.length > 0 && (
                <section className="catalog catalog--like-this">
                  <h2 className="catalog__title">More like this</h2>

                  <div className="catalog__films-list">
                    {
                      similar.slice(0, 4).map((item) => <Card key={item.id} film={item}/>)
                    }
                  </div>
                </section>
              )
            }
            <Footer/>
          </div>
        )}
      </Await>
    </Suspense>
  );
}

export default Film;
