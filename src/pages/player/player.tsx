import {Await, useLoaderData} from 'react-router-dom';
import {Suspense} from 'react';

import {FilmFull} from '@/types';
import Loader from '@/components/loader/loader';
import VideoPlayer from '@/components/video-player/video-player';

type LoadedData = {
  film: FilmFull;
}

function Player() {
  const data = useLoaderData() as LoadedData;

  return (
    <Suspense fallback={<Loader />}>
      <Await resolve={data.film}>
        {(film: FilmFull) => (
          <VideoPlayer film={film} />
        )}
      </Await>
    </Suspense>

  );
}

export default Player;
