import {NameSpace} from '@/constants';

import {State} from '@/types/state';
import {FilmListItem, FilmPromo} from '@/types';
import {createSelector} from '@reduxjs/toolkit';

export const getFilms = (state: Pick<State, NameSpace.Film>): FilmListItem[] => state[NameSpace.Film].films;
export const getFavorite = (state: Pick<State, NameSpace.Film>): FilmListItem[] => state[NameSpace.Film].favorite;
export const getSelectedGenre = (state: Pick<State, NameSpace.Film>): string | null => state[NameSpace.Film].selectedGenre;
export const getFilmsLimit = (state: Pick<State, NameSpace.Film>): number => state[NameSpace.Film].filmsLimit;
export const getPromoFilm = (state: Pick<State, NameSpace.Film>): FilmPromo | null => state[NameSpace.Film].promoFilm;
export const getGenres = createSelector(
  getFilms,
  (films) => Array.from(new Set(films.map((film) => film.genre))).slice(0, 9),
);
export const getFavoriteCount = createSelector(
  getFavorite,
  (favorite) => favorite.length,
);
