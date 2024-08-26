import api from '@/services/api';
import {ApiUrl} from '@/constants';
import {FilmFull, FilmListItem} from '@/types';

class Resource {
  async getFilm(filmId: string) {
    const { data } = await api.get<FilmFull>(`${ApiUrl.Films}/${filmId}`);
    return data;
  }

  async getSimilarFilms(filmId: string) {
    const { data } = await api.get<FilmListItem[]>(`${ApiUrl.Films}/${filmId}/similar`);
    return data;
  }
}

export const resource = new Resource();
