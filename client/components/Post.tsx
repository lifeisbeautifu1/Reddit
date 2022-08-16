import React from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import axios from 'axios';
import { ImArrowUp, ImArrowDown } from 'react-icons/im';
import { useRouter } from 'next/router';

import { useAuthState } from '../context/auth';

import { IPost } from '../interfaces';
import { ActionButton } from './';

dayjs.extend(relativeTime);

interface PostProps {
  post: IPost;
  setPosts?: React.Dispatch<React.SetStateAction<IPost[]>>;
}

const Post: React.FC<PostProps> = ({ post, setPosts }) => {
  const router = useRouter();
  const { authenticated } = useAuthState();
  const vote = async (value: number) => {
    if (!authenticated) {
      router.push('/login');
    }
    if (value === post.userVote) value = 0;
    try {
      const { data } = await axios.post('/misc/vote', {
        identifier: post.identifier,
        slug: post.slug,
        value,
      });
      if (setPosts)
        setPosts((prevState) =>
          prevState.map((post) => {
            return post.identifier === data.identifier ? data : post;
          })
        );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      id={post.identifier}
      key={post.identifier}
      className="flex mb-4 bg-white rounded"
    >
      <div className="w-10 py-3 text-xl text-center bg-gray-200 rounded-l">
        <div
          className={`flex items-center justify-center w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500 ${
            post.userVote === 1 && 'text-red-500'
          }`}
          onClick={() => vote(1)}
        >
          <ImArrowUp />
        </div>
        <p className="flex items-center justify-center my-1 text-xs font-bold">
          {post.voteScore}
        </p>
        <div
          className={`flex items-center justify-center w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-600 ${
            post.userVote === -1 && 'text-blue-600'
          }`}
          onClick={() => vote(-1)}
        >
          <ImArrowDown />
        </div>
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
              <ActionButton>
                <span className="inline-block mr-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </span>
                <span className="font-bold">{post.commentCount} Comments</span>
              </ActionButton>
            </a>
          </Link>
          <ActionButton>
            <span className="inline-block mr-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
            </span>
            <span className="font-bold">Share</span>
          </ActionButton>
          <ActionButton>
            <span className="inline-block mr-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </span>
            <span className="font-bold">Save</span>
          </ActionButton>
        </div>
      </div>
    </div>
  );
};

export default Post;
