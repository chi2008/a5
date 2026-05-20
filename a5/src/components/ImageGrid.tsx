import { IMAGE_BASE_URL } from '@/core/constants';
import type { ImageCell } from '@/core/types';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

type ImageGridProps = {
  results: Array<{
    id: number;
    imagePath: string | null;
    primaryText: string;
    secondaryText?: string;
    href?: string;
  }>;
  onClick?: (id: number) => void;
  children?: (image: ImageCell) => ReactNode;

};

export const ImageGrid = ({ results, onClick, children }: ImageGridProps) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(180px,1fr))] gap-5">
      
      {results?.map((result) => (
        <div
          key={result.id}
          className="relative block bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-[1.02] transition"
          onClick={() => {
            if (result.href) {
              navigate(result.href);
            } else {
              onClick?.(result.id);
            }
          }}
        >
          <img
            className="w-full h-[280px] object-cover" 
            src={`${IMAGE_BASE_URL}${result.imagePath}`} 
            alt={result.primaryText} 
          />
          {children && children(result)}
          <div className="p-3 text-center">
            <p className="text-sm font-semibold truncate">{result.primaryText}</p>
            {result.secondaryText && <p className="text-gray-400 text-xs">{result.secondaryText}</p>}
          </div>
          </div>
      ))}
    </div>
  );
};
