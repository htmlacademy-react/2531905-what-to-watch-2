import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {FILMS_INITIAL_LIMIT, NameSpace, RequestStatus} from '@/constants';
import {FilmListItem, FilmPromo} from '@/types';
import {getFavorite, getFilms, getPromo, toggleFavorite} from '@/store/film/api-actions';

type FilmState = {
  films: FilmListItem[];
  favorite: FilmListItem[];
  filmsListStatus: RequestStatus;
  favoriteStatus: RequestStatus;
  selectedGenre: string | null;
  filmsLimit: number;
  promoFilm: FilmPromo | null;
}

const initialState: FilmState = {
  films: [],
  favorite: [],
  filmsListStatus: RequestStatus.Idle,
  favoriteStatus: RequestStatus.Idle,
  selectedGenre: null,
  filmsLimit: FILMS_INITIAL_LIMIT,
  promoFilm: null,
};

export const filmSlice = createSlice({
  name: NameSpace.Film,
  initialState,
  reducers: {
    setSelectedGenre: (state, action: PayloadAction<string | null>) => {
      state.selectedGenre = action.payload;
    },
    clearFavorite: (state) => {
      state.favorite = [];
    },
    changeFilmsLimit: (state, action: PayloadAction<number>) => {
      const value = action.payload;
      if (value > 0) {
        state.filmsLimit += FILMS_INITIAL_LIMIT;
      } else {
        state.filmsLimit = FILMS_INITIAL_LIMIT;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFilms.pending, (state) => {
        state.filmsListStatus = RequestStatus.Pending;
      })
      .addCase(getFilms.fulfilled, (state, {payload}) => {
        state.films = payload;
        state.filmsListStatus = RequestStatus.Success;
      })
      .addCase(getFilms.rejected, (state) => {
        state.filmsListStatus = RequestStatus.Failed;
      })
      .addCase(getFavorite.pending, (state) => {
        state.favoriteStatus = RequestStatus.Pending;
      })
      .addCase(getFavorite.fulfilled, (state, {payload}) => {
        state.favorite = payload;
        state.favoriteStatus = RequestStatus.Success;
      })
      .addCase(getFavorite.rejected, (state) => {
        state.favorite = [];
        state.favoriteStatus = RequestStatus.Failed;
      })
      .addCase(getPromo.fulfilled, (state, {payload}) => {
        state.promoFilm = payload;
      })
      .addCase(getPromo.rejected, (state) => {
        state.promoFilm = null;
      })
      .addCase(toggleFavorite.fulfilled, (state, {payload}) => {
        if (payload.isFavorite) {
          state.favorite.push(payload);
        } else {
          state.favorite = state.favorite.filter((item) => item.id !== payload.id);
        }
      });
  }
});

export const {
  clearFavorite,
  setSelectedGenre,
  changeFilmsLimit,
} = filmSlice.actions;
