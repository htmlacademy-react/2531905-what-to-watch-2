export type AuthData = {
  email: string;
  password: string;
}

export type UserData = {
  name: string;
  avatarUrl: string;
  email: string;
  token: string;
}

export type ErrorDetail = {
  property: string;
  value: string;
  messages: string[];
}

export type LoginError = {
  errorType: string;
  message: string;
  details: ErrorDetail[];
}

export type FilmListItem = {
  id: string;
  name: string;
  previewImage: string;
  previewVideoLink: string;
  genre: string;
}

export type FilmPromo = {
  id: string;
  name: string;
  posterImage: string;
  backgroundImage: string;
  videoLink: string;
  genre: string;
  released: number;
  isFavorite: boolean;
}

export type FilmFull = {
  id: string;
  name: string;
  previewImage: string;
  previewVideoLink: string;
  genre: string;
  posterImage: string;
  backgroundImage: string;
  backgroundColor: string;
  videoLink: string;
  description: string;
  rating: number;
  scoresCount: number;
  director: string;
  starring: string[];
  runTime: number;
  released: number;
  isFavorite: boolean;
}

export type ReviewItem = {
  id: string;
  date: string;
  user: string;
  comment: string;
  rating: number;
}
