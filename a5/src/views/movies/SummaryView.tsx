import { ImageGrid } from '@/components';
import { DetailItem } from '@/components/DetailItem';
import { MOVIE_ENDPOINT } from '@/core/constants';
import type { CreditsResponse, MovieRepsonse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useParams } from 'react-router-dom';

export const SummaryView = () => {
  const { id } = useParams();
  const { data } = useTmdb<MovieRepsonse>(`${MOVIE_ENDPOINT}/${id}`, { append_to_response: 'videos' }, [id]);



  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="min-h-screen bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-6">Summary</h2>
      <p className="text-gray-300">{data.overview}</p>
        <DetailItem label="Release" value={data.release_date} />
        <DetailItem label="Rating" value={data.vote_average} />
        <DetailItem label="Runtime" value={data.runtime ? `${data.runtime} min` : 'N/A'} />
        <DetailItem label="Genres" value={data.genres.map(g => g.name).join(', ')} />

    </section>
  );
};