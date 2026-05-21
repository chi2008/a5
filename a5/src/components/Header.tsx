import { ButtonGroup, Link, SearchBar } from '@/components';
import { ICON_SIZE } from '@/core/constants';
import { useUserContext } from '@/hooks/useUserContext';
import { useState } from 'react';
import { FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import { GoGear } from 'react-icons/go';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const Header = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const [searchParams,setSearchParams] = useSearchParams();
  const MediaType = searchParams.get('type') || "movie";

  
  const searchChange = (Type: string) => {
    setSearchParams({ query: query, type: Type });
    navigate(`/search?query=${query}&type=${Type}`);
  };

  const handleSearch = (value: string) => {
    setQuery(value);
    setSearchParams({ query: value, type: MediaType });
    if (value.trim()) {
      navigate(`/search?query=${value}&type=${MediaType}`);
    }
  };
  const { userName, favorites, cart } = useUserContext();

  return (
    <header>
      <div>
      <nav className="flex gap-4 p-4 bg-gray-800">
        <h1 className="text-2xl font-bold text-white-900">TMDB Explorer</h1>
        <Link to="/movies">Movies</Link>
        <Link to='/television'>TV</Link>
        <Link to='/trending/'>Trending</Link>
        <Link to='/genres/'>Genres</Link>
        <SearchBar value={query} onChange={handleSearch} />
        <ButtonGroup
            value={MediaType}
            options={[
              { label: 'Movies', value: 'movie' },
              { label: 'TV', value: 'tv' },
              { label: 'Person', value: 'person' }
            ]}
            onClick={searchChange}
          />
      </nav>
      <div className="flex items-center">
            <h1 className="mr-4 text-xl text-gray-300">{userName}</h1>

            <button onClick={() => navigate('/favorites')} className="relative rounded-full p-2 transition hover:bg-gray-700">
              <FaRegHeart size={ICON_SIZE} />
              {favorites.size > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] text-white">
                  {favorites.size}
                </span>
              )}
            </button>

            <button onClick={() => navigate('/cart')} className="relative rounded-full p-2 transition hover:bg-gray-700">
              <FaShoppingCart size={ICON_SIZE} />
              {cart.size > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] text-white">
                  {cart.size}
                </span>
              )}
            </button>

            <button onClick={() => navigate('/settings')} className="relative rounded-full p-2 transition hover:bg-gray-700">

              <GoGear size={ICON_SIZE} />
            </button>
          </div>
        </div>
    </header>
  );
};