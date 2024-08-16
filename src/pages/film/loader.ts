import {LoaderFunctionArgs} from 'react-router-dom';
import {resource} from '@/services/resource';

export async function loader({ params }: LoaderFunctionArgs) {
  const filmId = params.id as string;
  const film = await resource.getFilm(filmId);
  const similar = await resource.getSimilarFilms(filmId);

  return {
    film, similar
  };
}
