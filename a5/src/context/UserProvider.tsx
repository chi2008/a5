import { UserContext } from '@/context';
import { CART_KEY, FAVORITES_KEY, USERNAME_KEY } from '@/core/constants';
import type { ImageCell } from '@/core/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { type ReactNode } from 'react';

type UserProviderProps = {
  children: ReactNode;
};

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

    const toggleCart = (image: ImageCell) => {
    setCart((prev) => {
      const cloned = new Map(prev);
      if (cloned.has(image.id)) {
        cloned.delete(image.id);
      } else {
        cloned.set(image.id, image);
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
