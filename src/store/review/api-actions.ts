import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiUrl, AppRoute} from '@/constants';
import {ReviewItem} from '@/types';
import {ThunkOptions} from '@/types/state';
import {generatePath} from 'react-router-dom';

type ReviewPayload = {
  formData: {
    comment: string;
    rating: number;
  };
  filmId: string;
}

export const getReviews = createAsyncThunk<ReviewItem[], string, ThunkOptions>(
  'review/getReviews',
  async (filmId, { extra: { api} }) => {
    const { data } = await api.get<ReviewItem[]>(`${ApiUrl.Reviews}/${filmId}`);

    return data;
  }
);

export const sendReview = createAsyncThunk<void, ReviewPayload, ThunkOptions>(
  'review/sendReview',
  async ({formData, filmId}, { extra: { api, router }}) => {
    await api.post<ReviewItem>(`${ApiUrl.Reviews}/${filmId}`, formData);

    const filmUrl = generatePath(AppRoute.FilmPage, {
      id: filmId,
    });
    router.navigate(filmUrl);
  }
);
