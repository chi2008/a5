import type { ImageCell } from "@/core/types";
import { createContext } from "react";

export type UserContextType ={
        userName: string;
        favorites: Map<number, ImageCell>;
        cart: Map<number, ImageCell>;
        setCart: (cart: Map<number, ImageCell>) => void;
        setfavorites: (favorites: Map<number, ImageCell>) => void;
        setUserName: (userName: string) => void;
        toggleFavorite: (image: ImageCell) => void;
        toggleCart: (image: ImageCell) => void;

        selectedMovies: string[];
        setSelectedMovies: React.Dispatch<React.SetStateAction<string[]>>;
        selectedTV: string[];
        setSelectedTV: React.Dispatch<React.SetStateAction<string[]>>;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);
