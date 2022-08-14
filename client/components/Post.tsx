import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { FaBookmark, FaCommentAlt, FaShare } from 'react-icons/fa';

import { IPost } from '../interfaces';

dayjs.extend(relativeTime);

interface PostProps {
  post: IPost;
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <div key={post.identifier} className="flex mb-4 bg-white rounded">
      <div className="w-10 text-center bg-gray-200 rounded-l">
        <p>V</p>
      </div>
      <div className="w-full p-2">
        <div className="flex items-center">
          <Link href={`/r/${post.subName}`}>
            <img
              src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
              alt={post.subName}
              className="w-6 h-6 mr-1 rounded-full cursor-pointer"
            />
          </Link>
          <Link href={`/r/${post.subName}`}>
            <a className="text-xs font-bold cursor-pointer hover:underline">
              /r/{post.subName}
            </a>
          </Link>
          <p className="text-xs text-gray-500">
            <span className="mx-1">•</span>
            Posted by{' '}
            <Link href={`/u/${post.username}`}>
              <a className="mx-1 hover:underline">/u/{post.username}</a>
            </Link>
            <Link href={post.url}>
              <a className="mx-1 hover:underline">
                {dayjs(post.createdAt).fromNow()}
              </a>
            </Link>
          </p>
        </div>
        <Link href={post.url}>
          <a className="my-1 text-lg font-medium">{post.title}</a>
        </Link>
        {post.body && <p className="my-1 text-sm">{post.body}</p>}
        <div className="flex">
          <Link href={post.url}>
            <a>
              <div className="flex items-center px-1 py-1 mr-1 text-xs text-gray-400 rounded cursor-pointer hover:bg-gray-200">
                <span className="inline-block mr-1">
                  <FaCommentAlt />
                </span>
                <span className="font-bold">20 Comments</span>
              </div>
            </a>
          </Link>
          <div className="flex items-center px-1 py-1 mr-1 text-xs text-gray-400 rounded cursor-pointer hover:bg-gray-200">
            <span className="inline-block mr-1">
              <FaShare />
            </span>
            <span className="font-bold">Share</span>
          </div>
          <div className="flex items-center px-1 py-1 mr-1 text-xs text-gray-400 rounded cursor-pointer hover:bg-gray-200">
            <span className="inline-block mr-1">
              <FaBookmark />
            </span>
            <span className="font-bold">Save</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
