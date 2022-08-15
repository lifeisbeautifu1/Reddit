import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { ISub } from '../interfaces';

const HomeSidebar = () => {
  const [topSubs, setTopSubs] = useState<ISub[]>([]);

  useEffect(() => {
    async function fetchTopSubs() {
      try {
        const { data } = await axios.get('/misc/top-subs');
        setTopSubs(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTopSubs();
  }, []);

  return (
    <div className="ml-6 w-80">
      <div className="bg-white rounded">
        <div className="p-4 border-b-2">
          <p className="text-lg font-semibold text-center">Top Communities</p>
        </div>
        <div>
          {topSubs.map((sub: ISub) => (
            <div
              key={sub.name}
              className="flex items-center px-4 py-2 text-xs border-b"
            >
              <div className="mr-2 overflow-hidden rounded-full cursor-pointer">
                <Link href={`/r/${sub?.name}`}>
                  <a className="relative w-8 h-8 block">
                    <Image
                      src={sub?.imageUrl}
                      alt={sub?.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </a>
                </Link>
              </div>
              <Link href={`/r/${sub.name}`}>
                <a className="font-bold hover:cursor-pointer">/r/{sub.name}</a>
              </Link>
              <p className="ml-auto font-medium">{sub.posts.length}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeSidebar;
