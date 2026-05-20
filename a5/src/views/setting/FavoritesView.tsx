import { useNavigate } from "react-router-dom";
import { ImageGrid } from "@/components";
import { favoriteAction } from "@/core/imageActions";
import { useUserContext } from "@/hooks/useUserContext";
import type { ImageCell } from "@/core/types";
import { ImageOverlay } from "@/components/ImageOverlay";

export const FavoritesView = () => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useUserContext();

return (
    <section className="mx-auto max-w-7xl space-y-5 p-5 text-white">
      <button
        className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      <h1 className="text-3xl font-bold">Favorites</h1>
      
      {favorites.size === 0 ? (
        <p className="mt-10 text-center text-gray-400">You have no favorites yet.</p>
      ) : (
        /* 💡 核心修改 1：将 images 换成 results */
        <ImageGrid 
          results={Array.from(favorites.values())} 
          /* 💡 核心修改 2：ImageGrid 传出的是数字 id，不是整个 image 对象 */
          onClick={(id) => navigate(`/movie/${id}/credits`)}
        >
          {/* 💡 核心修改 3：保持 Render Props 结构，让爱心能挂载进去 */}
          {(image) => (
            <ImageOverlay 
              actions={[
                favoriteAction((img: ImageCell) => favorites.has(img.id), toggleFavorite)]} 
              image={image} 
            />
          )}
        </ImageGrid>
      )}
    </section>
  );
};
