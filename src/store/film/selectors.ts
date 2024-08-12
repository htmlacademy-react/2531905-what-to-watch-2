import {NameSpace} from '@/constants';

import {State} from '@/types/state';
import {FilmListItem, FilmPromo} from '@/types';

export const getFilms = (state: Pick<State, NameSpace.Film>): FilmListItem[] => state[NameSpace.Film].films;
export const getFavorite = (state: Pick<State, NameSpace.Film>): FilmListItem[] => state[NameSpace.Film].favorite;
export const getSelectedGenre = (state: Pick<State, NameSpace.Film>): string | null => state[NameSpace.Film].selectedGenre;
export const getFilmsLimit = (state: Pick<State, NameSpace.Film>): number => state[NameSpace.Film].filmsLimit;
export const getPromoFilm = (state: Pick<State, NameSpace.Film>): FilmPromo | null => state[NameSpace.Film].promoFilm;
