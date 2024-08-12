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
  App = 'APP',
}

export const FILMS_INITIAL_LIMIT = 8;

export enum FilmCountDiff {
  Increase = 1,
  Reset = 0,
}
