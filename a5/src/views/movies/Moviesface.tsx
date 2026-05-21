import { ButtonGroup,ImageGrid, Pagination } from '@/components';
import { ImageOverlay } from '@/components/ImageOverlay';
import { MOVIE_POPULAR_ENDPOINT, MOVIE_TOP_RATED_ENDPOINT, MOVIE_UPCOMING, NOW_PLAYING_ENDPOINT } from '@/core/constants';
import { cartAction, favoriteAction } from '@/core/imageActions';
import type { ImageCell, MediaResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useUserContext } from '@/hooks/useUserContext';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const Movies = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { favorites, toggleFavorite } = useUserContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const interval = searchParams.get('interval') || 'now_playing';
  const Chooseinterval ={
    now_playing:NOW_PLAYING_ENDPOINT,
    popular:MOVIE_POPULAR_ENDPOINT,
    top_rated:MOVIE_TOP_RATED_ENDPOINT,
    upcoming:MOVIE_UPCOMING,
  }
  const Choose = Chooseinterval[interval]
  const { data } = useTmdb<MediaResponse>(Choose, { page }, [Choose, page]);

  const gridData = (data?.results ?? []).map((result) => {
    const releaseYear = result.release_date ? new Date(result.release_date).getFullYear() : 2026;
    const calculatedPrice = 19.99-(2026 - releaseYear);
    const finalPrice = Math.max(4.99, calculatedPrice);

    return {
      id: result.id,
      imagePath: result.poster_path,
      primaryText: result.original_title,
      secondaryText: `$${finalPrice.toFixed(2)}`
  };
});

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
      <section className="max-w-[1200px] mx-auto p-5 space-y-5">
        <h1 className="text-3xl font-bold mb-4">Movie</h1>
        
        <ButtonGroup
          value={interval}
          onClick={(value: string) => {
            setSearchParams({ interval: value });
          }}
          options={[
            { label: 'Now Playing', value: 'now_playing' },
            { label: 'Popular', value: 'popular' },
            { label: 'Top Rated', value: 'top_rated'},
            { label: 'Upcoming', value: 'upcoming'},
          ]}
        />
      <ImageGrid 
        results={gridData} onClick={(id) => navigate(`/movie/${id}/summary`)}>
        {(image) => (
          <ImageOverlay actions={[favoriteAction((img: ImageCell) => favorites.has(img.id), toggleFavorite)]} 
            image={image} 
          />
        )}
      </ImageGrid>

      <Pagination page={page} maxPages={data?.total_pages} onClick={setPage} />
    </section>
  );
};
