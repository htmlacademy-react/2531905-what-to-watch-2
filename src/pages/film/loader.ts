import {defer, LoaderFunctionArgs} from 'react-router-dom';
import {resource} from '@/services/resource';

export function loader({ params }: LoaderFunctionArgs) {
  const filmId = params.id as string;
  const film = resource.getFilm(filmId);
  const similar = resource.getSimilarFilms(filmId);

  return defer({
    film, similar
  });
}
