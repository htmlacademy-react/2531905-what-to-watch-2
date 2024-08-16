export const ROLLBAR_CONFIG = {
  accessToken: '2b3774040e63470fa37a2ce179b6d7b9',
  environment: 'testenv',
};
export enum AppRoute {
  MainPage = '/',
  LoginPage = '/login',
  MyListPage = '/mylist',
  FilmPage = '/films/:id',
  ReviewPage = '/films/:id/review',
  PlayerPage = '/player/:id',
  NotFoundPage = '/not-found',
  DefaultPage = '*',
}

export enum ApiUrl {
  Films = '/films',
  Login = '/login',
  Logout = '/logout',
  Promo = '/promo',
  Favorite = '/favorite',
  Reviews = '/comments',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum RequestStatus {
  Idle = 'IDLE',
  Pending = 'PENDING',
  Success = 'SUCCESS',
  Failed = 'FAILED',
}

export enum NameSpace {
  Film = 'FILM',
  User = 'USER',
  Review = 'REVIEW',
}

export const FILMS_INITIAL_LIMIT = 8;

export enum FilmCountDiff {
  Increase = 1,
  Reset = 0,
}

export enum RatingText {
  Bad = 'Bad',
  Normal = 'Normal',
  Good = 'Good',
  VeryGood = 'Very good',
  Awesome = 'Awesome',
}

export const RATING_STARS_COUNT = 10;
export const MIN_REVIEW_LENGTH = 50;
export const MAX_REVIEW_LENGTH = 400;
