import dayjs from 'dayjs';
import Link from 'next/link';

import { ISub } from '../interfaces';
import { useAuthState } from '../context/auth';

const Sidebar = ({ sub }: { sub?: ISub }) => {
  const { authenticated } = useAuthState();
  return (
    <div className="ml-6 w-80">
      <div className="bg-white rounded">
        <div className="p-3 bg-blue-500 rounded-t">
          <p className="font-semibold text-white">About Community</p>
        </div>
        <div className="p-3">
          <p className="mb-3 text-md">{sub?.description}</p>
          <div className="flex mb-3 text-sm font-medium">
            <div className="w-1/2">
              <p>5.2k</p>
              <p>Members</p>
            </div>
            <div className="w-1/2">
              <p>150</p>
              <p>Online</p>
            </div>
          </div>
          <p className="my-3 flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"
              />
            </svg>
            Created {dayjs(sub?.createdAt).format('D MMM YYYY')}
          </p>
          {authenticated && (
            <Link href={`/r/${sub?.name}`}>
              <a className="w-full py-1 text-sm blue button">Create Post</a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
