import {createAsyncThunk} from '@reduxjs/toolkit';
import {FilmFull, FilmListItem, FilmPromo} from '@/types';
import {ThunkOptions} from '@/types/state';
import {ApiUrl} from '@/constants';

type ToggleFavoritePayload = {
  filmId: string;
  status: number;
}

export const getFilms = createAsyncThunk<FilmListItem[], undefined, ThunkOptions>(
  'film/getFilms',
  async (_arg, { extra: { api} }) => {
    const { data } = await api.get<FilmListItem[]>(ApiUrl.Films);

    return data;
  }
);

export const getFavorite = createAsyncThunk<FilmListItem[], undefined, ThunkOptions>(
  'film/getFavorite',
  async (_arg, { extra: { api} }) => {
    const { data } = await api.get<FilmListItem[]>(ApiUrl.Favorite);

    return data;
  }
);

export const getPromo = createAsyncThunk<FilmPromo, undefined, ThunkOptions>(
  'film/getPromo',
  async (_arg, { extra: { api} }) => {
    const { data } = await api.get<FilmPromo>(ApiUrl.Promo);

    return data;
  }
);

export const toggleFavorite = createAsyncThunk<FilmFull, ToggleFavoritePayload, ThunkOptions>(
  'offer/toggleFavorite',
  async ({filmId, status}, { extra: { api} }) => {
    const {data} = await api.post<FilmFull>(`${ApiUrl.Favorite}/${filmId}/${status}`);

    return data;
  }
);
