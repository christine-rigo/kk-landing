'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

interface Image {
  url: string;
}

interface GameInfo {
  name: string;
  image: Image;
  code: string;
  category?: string;
  onClick?: () => void;
}

interface GameProps {
  data?: GameInfo[];
}

const Games: React.FC<GameProps> = ({ data }) => {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const router = useRouter();

  const filteredData = data?.filter(game => 
    !category || category === 'all-games' || game.category === category
  );

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 md:gap-14'>
    </div>
  );
};

export default Games;
