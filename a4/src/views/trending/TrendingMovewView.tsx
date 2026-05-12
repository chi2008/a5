import { ButtonGroup, ImageGrid, Pagination } from '@/components';
import type { MediaResponse,ChangeType} from '@/core/types';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const TrendingView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [MediaType, setMediaType] = useState<ChangeType>(searchParams.get('Type') as ChangeType || 'movie');
  const interval = searchParams.get('interval') || 'day';
  const { data } = useTmdb<MediaResponse>(`https://api.themoviedb.org/3/trending/${MediaType}/${interval}`, { page, time_window: interval }, [page, interval, MediaType]);

  const gridData = (data?.results ?? []).map((result) => ({
    id: result.id,
    imagePath: result.poster_path,
    primaryText: result.original_title || result.name,
  }));

  const Change = (type: ChangeType) => {
    setMediaType(type);
    setPage(1); 
    setSearchParams({ interval, type });
  };

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="max-w-[1200px] mx-auto p-5 space-y-5">
      <div className="flex items-center justify-between mb-4">
      <h1 className="text-3xl font-bold">Trending</h1>
        <ButtonGroup
          value={MediaType}
          options={[
            { label: 'Movie', value: 'movie' },
            { label: 'Tv', value: 'tv' },
          ]}
         onClick={(value) => Change(value as ChangeType)}
        />
        <ButtonGroup
          value={interval}
          options={[
            { label: 'Day', value: 'day' },
            { label: 'Week', value: 'week' },
          ]}
          onClick={(value) => setSearchParams({ interval: value })}
        />
      </div>
      <ImageGrid results={gridData} onClick={(id) => navigate(`/${MediaType}/${id}`)} />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};
