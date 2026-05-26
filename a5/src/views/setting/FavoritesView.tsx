import { data, useNavigate } from "react-router-dom";
import { ButtonGroup, ImageGrid } from "@/components";
import { favoriteAction } from "@/core/imageActions";
import { useUserContext } from "@/hooks/useUserContext";
import type { ChangeType, ImageCell } from "@/core/types";
import { ImageOverlay } from "@/components/ImageOverlay";
import { useState } from "react";


export const FavoritesView = () => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite, setfavorites } = useUserContext();
  const [MediaType, setMediaType] = useState<ChangeType>('movie');

const favoritesItem = Array.from(favorites.values()).filter(
  (item: any) => item.type === MediaType
);  const handleEmptyHeart = () => {
    if (setfavorites) {
      setfavorites(new Map(null)); 
    } else {
      favoritesItem.forEach(item => toggleFavorite(item));
    }
  };
return (
    <section className="mx-auto max-w-7xl space-y-6 p-5 text-white">
      <button
        className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition text-sm"
        onClick={() => navigate(-1)}>
        Back
      </button>

      <button
        onClick={handleEmptyHeart}
        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition text-sm font-semibold">
        Clear Favorites
      </button>

      <ButtonGroup
                value={MediaType}
                options={[
                  { label: 'Movie', value: 'movie' },
                  { label: 'Tv', value: 'tv' },
                ]}
               onClick={(value) => setMediaType(value as ChangeType)}
              />
        
      <h1 className="text-3xl font-bold">Favorites</h1>
      {favorites.size === 0 ? (
        <p className="mt-10 text-center text-gray-400">You have no {MediaType === 'movie' ? 'movies' : 'TV shows'} favorites yet.</p>
      ) : (
        <ImageGrid 
          results={favoritesItem} 
          onClick={(id) => navigate(`/${MediaType}/${id}/summary`)}
        >
          {(image) => (
            <ImageOverlay 
              actions={[favoriteAction((img: ImageCell) => favorites.has(img.id), toggleFavorite)]} 
              image={image} 
            />
          )}
        </ImageGrid>
      )}
    </section>
  );
};
