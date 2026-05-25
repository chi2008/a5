import { DetailItem } from '@/components/DetailItem';
import { TV_ENDPOINT } from '@/core/constants';
import type { TvResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useParams } from 'react-router-dom';

export const TVSummaryView = () => {
  const { id } = useParams();
  const { data } = useTmdb<TvResponse>(`${TV_ENDPOINT}/${id}`, { append_to_response: 'videos' }, [id]);



  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="min-h-screen bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-6">Summary</h2>
      <p className="text-gray-300">{data.overview}</p>
        <DetailItem label="Release" value={data.first_air_date} />
        <DetailItem label="Status" value={data.status} />
        <DetailItem label="Seasons" value={data.number_of_seasons } />
        <DetailItem label="Episodes" value={data.number_of_episodes} />

    </section>
  );
};