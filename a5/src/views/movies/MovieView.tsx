import { LinkGroup, } from '@/components';
import { DetailItem } from '@/components/DetailItem';
import { Modal } from '@/components/Modal';
import { ICON_SIZE, IMAGE_BASE_URL, MOVIE_ENDPOINT, ORIGINAL_IMAGE_BASE_URL } from '@/core/constants';
import type { MovieRepsonse } from '@/core/types';
import { getImageUrl } from '@/core/utils/images';
import { useTmdb } from '@/hooks';
import { useUserContext } from '@/hooks/useUserContext';
import { FaShoppingCart } from 'react-icons/fa';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

export const MovieView = () => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useUserContext();
  const{ cart, toggleCart } = useUserContext();

  const { id } = useParams();
  const { data } = useTmdb<MovieRepsonse>(`${MOVIE_ENDPOINT}/${id}`, { append_to_response: 'videos' }, [id]);

  

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <Modal onClose={() => navigate(-1)}>
      <div className="p-6 space-y-6">
        <div
          className="h-[420px] bg-cover bg-center rounded-2xl"
          style={{
            backgroundImage: `url(${ORIGINAL_IMAGE_BASE_URL}${data?.backdrop_path})`,
          }}
        />
        <div className="flex gap-8">
          <img className="w-[220px] h-[330px] object-cover rounded-xl" src={`${IMAGE_BASE_URL}${data?.poster_path}`} alt={data?.title} />
          <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-bold">{data.title}</h1>
                <DetailItem label="" value={data.genres.map(g => g.name).join(', ')} />

               <button
                className="rounded-full p-2 transition hover:bg-black/40"
                onClick={() => {if (favorites.has(data.id)) {toggleFavorite(data);}
                  toggleCart({
                    id: data.id,
                    type: 'movie',
                    imagePath: getImageUrl(data.poster_path),
                    imageUrl: getImageUrl(data.poster_path),
                    primaryText: data.title,
                  })
                }}
              >
                {cart.has(data.id) ? (
                  <FaShoppingCart className="text-blue-500" size={ICON_SIZE} />
                ) : (
                  <FaShoppingCart className="text-white" size={ICON_SIZE} />
                )}
              </button>

            </div>
            <div className="mt-auto flex flex-wrap gap-4 pt-2">
            
            <LinkGroup
              options={[
                { label: 'Summary', to: 'summary' },
                { label: 'Credits', to: 'credits' },
                { label: 'Reviews', to: 'reviews' },
                { label: 'Trailers', to: 'trailers'},
              ]}
            />
          </div>
        </div>
        <Outlet />
      </div>
    </Modal>
  );
};
