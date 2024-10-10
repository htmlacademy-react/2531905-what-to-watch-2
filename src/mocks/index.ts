import {datatype, lorem, internet, image, name, date} from 'faker';
import {FilmFull, FilmListItem, FilmPromo, ReviewItem} from '@/types';
import {Action} from '@reduxjs/toolkit';
import {AuthorizationStatus, FILMS_INITIAL_LIMIT, RequestStatus} from '@/constants';
import {State} from '@/types/state';

export const makeFakeFilm = (): FilmListItem => ({
  id: datatype.uuid(),
  name: lorem.word(),
  previewImage: internet.url(),
  previewVideoLink: 'https://13.design.htmlacademy.pro/static//film/video/dog.mp4',
  genre: lorem.word(),
} as FilmListItem);

export const makeFakePromoFilm = (): FilmPromo => ({
  id: datatype.uuid(),
  name: lorem.word(),
  posterImage: image.imageUrl(),
  backgroundImage: image.imageUrl(),
  videoLink: internet.url(),
  genre: lorem.word(),
  released: datatype.number({ min: 1960, max: 2024 }),
  isFavorite: datatype.boolean(),
} as FilmPromo);

export const makeFakeFilmFull = (): FilmFull => ({
  id: datatype.uuid(),
  name: lorem.word(),
  previewImage: internet.url(),
  previewVideoLink: internet.url(),
  genre: lorem.word(),
  posterImage: image.imageUrl(),
  backgroundImage: image.imageUrl(),
  backgroundColor: internet.color(),
  videoLink: internet.url(),
  description: lorem.words(30),
  rating: datatype.number({ min: 1, max: 10000 }),
  scoresCount: datatype.number({ min: 1, max: 10 }),
  director: name.findName(),
  starring: [name.findName(), name.findName(), name.findName(), name.findName(), name.findName()],
  runTime: datatype.number({ min: 1, max: 200 }),
  released: datatype.number({ min: 1960, max: 2024 }),
  isFavorite: datatype.boolean(),
} as FilmFull);

export const makeFakeReview = (): ReviewItem => ({
  id: datatype.uuid(),
  date: date.recent().toString(),
  user: name.findName(),
  comment: lorem.words(10),
  rating:datatype.number({ min: 1, max: 10 }),
} as ReviewItem);

export const initFilmState = (data = {}) => ({
  films: [],
  favorite: [],
  filmsListStatus: RequestStatus.Idle,
  favoriteStatus: RequestStatus.Idle,
  selectedGenre: null,
  filmsLimit: FILMS_INITIAL_LIMIT,
  promoFilm: null,
  ...data,
});

export const initUserState = (data = {}) => ({
  authorizationStatus: AuthorizationStatus.NoAuth,
  requestStatus: RequestStatus.Idle,
  loginResponseErrors: [],
  user: null,
  ...data,
});

export const initReviewState = (data = {}) => ({
  reviews: [],
  reviewRequestStatus: RequestStatus.Idle,
  reviewsListStatus: RequestStatus.Idle,
  ...data,
});

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  USER: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    requestStatus: RequestStatus.Idle,
    loginResponseErrors: [],
    user: null,
  },
  FILM: { films: [],
    favorite: [],
    filmsListStatus: RequestStatus.Idle,
    favoriteStatus: RequestStatus.Idle,
    selectedGenre: null,
    filmsLimit: FILMS_INITIAL_LIMIT,
    promoFilm: null,
  },
  REVIEW: {
    reviews: [],
    reviewRequestStatus: RequestStatus.Idle,
    reviewsListStatus: RequestStatus.Idle,
  },
  ...initialState ?? {},
});


export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);
