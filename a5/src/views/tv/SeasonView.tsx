import { ImageGrid } from '@/components';
import { ImageOverlay } from '@/components/ImageOverlay';
import { TV_DETAIL_ENDPOINT } from '@/core/constants';
import { cartAction, favoriteAction } from '@/core/imageActions';
import type { ImageCell, SeasonResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useUserContext } from '@/hooks/useUserContext';
import { useParams } from 'react-router-dom';

export const SeasonView = () => {
  const { id } = useParams();
  const { favorites, toggleFavorite, cart, toggleCart} = useUserContext();
  const { data } = useTmdb<SeasonResponse>(`${TV_DETAIL_ENDPOINT(id!)}`, {}, []);

  const gridData = (data?.seasons ?? []).map((result) => {
    const releaseYear = result.air_date ? new Date(result.air_date).getFullYear() : 2026;
    const calculatedPrice = 19.99-(2026 - releaseYear);
    const finalPrice = Math.max(4.99, calculatedPrice);

    return{
      id: result.id,
      type:'tv',
      imagePath: result.poster_path,
      primaryText: `Season ${result.season_number}`,
      secondaryText: `$${finalPrice.toFixed(2)}`,
      href: `/tv/${id}/season/${result.season_number}`
  };
});

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="min-h-screen bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-6">Seasons</h2>
      {!data.seasons.length && <p className="text-gray-400 text-center">No seasons available.</p>}
      <ImageGrid 
        results={gridData}>
        {(image) => (
          <ImageOverlay actions={[favoriteAction((img: ImageCell) =>  favorites.has(img.id), toggleFavorite),cartAction((img: ImageCell) => cart.has(img.id),toggleCart)]} 
            image={image} 
         />
         )}
      </ImageGrid>
    </section>
  );
};
