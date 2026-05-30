import { UserContext } from '@/context';
import { CART_KEY, FAVORITES_KEY, USERNAME_KEY } from '@/core/constants';
import type { ImageCell } from '@/core/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useState, type ReactNode } from 'react';

type UserProviderProps = {
  children: ReactNode;
};

const DEFAULT_MOVIES = ["Action", "Adventure", "Animation", "Crime", "Family", "Fantasy", "History", "Horror", "Mystery", "Sci-Fi"];
const DEFAULT_TV = ["Action", "Animation", "Comedy", "Crime", "Documentary", "Drama", "Family", "Kids", "Mystery", "Sci-Fi"];

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userName, setUserName] = useLocalStorage<string, string>(USERNAME_KEY, 'User');
  const [favorites, setFavorites] = useLocalStorage<Map<number, ImageCell>, [number, ImageCell][]>(FAVORITES_KEY, new Map(), {
    serialize: (map) => Array.from(map.entries()),
    deserialize: (entries) => new Map(entries),
  });

  const [cart, setCart] = useLocalStorage<Map<number, ImageCell>, [number, ImageCell][]>(CART_KEY, new Map(), {
    serialize: (map) => Array.from(map.entries()),
    deserialize: (entries) => new Map(entries),
  });

  const [selectedMovies, setSelectedMovies] = useState<string[]>(DEFAULT_MOVIES);
  const [selectedTV, setSelectedTV] = useState<string[]>(DEFAULT_TV);

    const toggleCart = (image: ImageCell) => {
    setCart((prev) => {
      const cloned = new Map(prev);
      if (cloned.has(image.id)) {
        cloned.delete(image.id);
      } else {
        cloned.set(image.id, image);

        setFavorites((prevfavorite) => {
        if (prevfavorite.has(image.id)) {
          const clonedFavorite = new Map(prevfavorite);
          clonedFavorite.delete(image.id);
          return clonedFavorite;
        }
        return prevfavorite;
      });
      }
      return cloned;
    });
  };


  const toggleFavorite = (image: ImageCell) => {
    setFavorites((prev) => {
      const cloned = new Map(prev);

      if (cloned.has(image.id)) {
        cloned.delete(image.id);
      } else {
        cloned.set(image.id, image);

        setCart((prevCart) => {
        if (prevCart.has(image.id)) {
          const clonedCart = new Map(prevCart);
          clonedCart.delete(image.id);
          return clonedCart;
        }
        return prevCart; 
      });
      }

      return cloned;
    });
  };

  return (
    <UserContext.Provider
      value={{
        userName,
        favorites,
        cart,
        setUserName,
        toggleFavorite,
        toggleCart,
        setCart,
        setFavorites,
        selectedMovies,
        setSelectedMovies,
        selectedTV,
        setSelectedTV,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
