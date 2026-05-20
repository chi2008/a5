import { LinkGroup, } from '@/components';
import { DetailItem } from '@/components/DetailItem';
import { Modal } from '@/components/Modal';
import { ICON_SIZE, IMAGE_BASE_URL, MOVIE_ENDPOINT, ORIGINAL_IMAGE_BASE_URL } from '@/core/constants';
import type { MovieRepsonse } from '@/core/types';
import { getImageUrl } from '@/core/utils/images';
import { useTmdb } from '@/hooks';
import { useUserContext } from '@/hooks/useUserContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
  const TMDB_PARAMS = { append_to_response: 'videos' };

export const MovieView = () => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useUserContext();
  const { id } = useParams();
  const { data } = useTmdb<MovieRepsonse>(`${MOVIE_ENDPOINT}/${id}`, TMDB_PARAMS, [id]);

  

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
            <button
                className="rounded-full p-2 transition hover:bg-black/40"
                onClick={() =>
                  toggleFavorite({
                    id: data.id,
                    imageUrl: getImageUrl(data.poster_path),
                    primaryText: data.title,
                  })
                }
              >
                {favorites.has(data.id) ? (
                  <FaHeart className="text-blue-500" size={ICON_SIZE} />
                ) : (
                  <FaRegHeart className="text-white" size={ICON_SIZE} />
                )}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <DetailItem label="Release" value={data.release_date} />
              <DetailItem label="Rating" value={data.vote_average} />
            <p className="text-gray-300">{data.overview}</p>
            
            <LinkGroup
              options={[
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
