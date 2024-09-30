import {getFilms, getFavorite, getFavoriteStatus, getFilmsLimit, getSelectedGenre, getPromoFilm, getGenres, getFavoriteCount} from './selectors';
import {initFilmState as initState, makeFakeFilm, makeFakePromoFilm} from '@/mocks';
import {FILMS_INITIAL_LIMIT, NameSpace, RequestStatus} from '@/constants';
import {lorem} from 'faker';

describe('film Slice selectors', () => {
  it('should return offers from state', () => {
    const films = [makeFakeFilm(), makeFakeFilm()];
    const state = initState({
      films
    });

    const result = getFilms({ [NameSpace.Film]: state });

    expect(result).toEqual(films);
  });

  it('should return favorite films from state', () => {
    const favorite = [makeFakeFilm()];
    const state = initState({
      favorite
    });

    const result = getFavorite({ [NameSpace.Film]: state });

    expect(result).toEqual(favorite);
  });

  it('should return favorite status from state', () => {
    const status = RequestStatus.Idle;
    const state = initState({
      favoriteStatus: status
    });

    const result = getFavoriteStatus({ [NameSpace.Film]: state });

    expect(result).toEqual(status);
  });

  it('should return selected genre from state', () => {
    const selectedGenre = lorem.word();
    const state = initState({
      selectedGenre
    });

    const result = getSelectedGenre({ [NameSpace.Film]: state });

    expect(result).toEqual(selectedGenre);
  });

  it('should return films initial limit from state', () => {
    const state = initState();

    const result = getFilmsLimit({ [NameSpace.Film]: state });

    expect(result).toEqual(FILMS_INITIAL_LIMIT);
  });

  it('should return promo film from state', () => {
    const promoFilm = [makeFakePromoFilm()];
    const state = initState({
      promoFilm
    });

    const result = getPromoFilm({ [NameSpace.Film]: state });

    expect(result).toEqual(promoFilm);
  });

  it('should return all genres from state', () => {
    const films = [makeFakeFilm(), makeFakeFilm(), makeFakeFilm()];
    const state = initState({
      films
    });
    const expectedGenres = Array.from(new Set(films.map((film) => film.genre))).slice(0, 9);

    const result = getGenres({ [NameSpace.Film]: state });

    expect(result).toEqual(expectedGenres);
  });

  it('should return favorite films count from state', () => {
    const favorite = [makeFakeFilm(), makeFakeFilm(), makeFakeFilm()];
    const state = initState({
      favorite
    });

    const result = getFavoriteCount({ [NameSpace.Film]: state });

    expect(result).toEqual(favorite.length);
  });
});
