import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ImArrowDown, ImArrowUp } from 'react-icons/im';

import { IPost, IComment } from '../../../../interfaces';
import { Sidebar, ActionButton } from '../../../../components';
import { useAuthState } from '../../../../context/auth';

dayjs.extend(relativeTime);

const PostPage = () => {
  const [post, setPost] = useState<IPost | null>(null);
  const [refetch, setRefetch] = useState(false);
  const [newComment, setNewComment] = useState('');

  const { authenticated, user } = useAuthState();

  const router = useRouter();
  const { identifier, sub, slug } = router.query;

  useEffect(() => {
    async function fetchPost() {
      if (identifier && sub && slug)
        try {
          const { data } = await axios.get(`/posts/${identifier}/${slug}`);
          setPost(data);
        } catch (error) {
          console.log(error);
        }
    }
    fetchPost();
  }, [identifier, sub, slug, refetch]);

  const vote = async (value: number, comment?: IComment) => {
    if (!authenticated) router.push('/login');

    if (
      (!comment && value === post?.userVote) ||
      (comment && comment.userVote === value)
    )
      value = 0;

    try {
      const res = await axios.post('/misc/vote', {
        identifier,
        slug,
        value,
        commentIdentifier: comment?.identifier,
      });
      setRefetch(!refetch);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Head>
        <title>{post?.title}</title>
      </Head>
      <Link href={`/r/${sub}`}>
        <a>
          <div
            className={`flex items-center w-full h-40 p-8 bg-white ${
              !post?.sub?.imageUrn && 'bg-blue-500 h-24'
            }`}
            style={{
              backgroundImage: `url(${post?.sub?.bannerUrl})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'contain',
            }}
          >
            <div className="container flex items-center">
              {post && (
                <div className="h-10 w-10 mr-2 overflow-hidden rounded-full">
                  <Image src={post.sub?.imageUrl!} height={40} width={40} />
                </div>
              )}
              <p
                className={`text-xl font-semibold text-white ${
                  post?.sub?.bannerUrl && 'text-black'
                }`}
              >
                /r/{sub}
              </p>
            </div>
          </div>
        </a>
      </Link>
      <div className="container flex pt-5">
        <div className="w-[40rem]">
          <div className="bg-white rounded">
            {post && (
              <div className="flex">
                <div className="w-10 py-3 text-xl text-center bg-gray-200 rounded-l">
                  <div
                    className={` flex items-center justify-center w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500 ${
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
                <div className="p-2">
                  <div className="flex items-center">
                    <p className="text-xs text-gray-500">
                      Posted by{' '}
                      <Link href={`/u/${post.username}`}>
                        <a className="mx-1 hover:underline">
                          /u/{post.username}
                        </a>
                      </Link>
                      <Link href={post.url}>
                        <a className="mx-1 hover:underline">
                          {dayjs(post.createdAt).fromNow()}
                        </a>
                      </Link>
                    </p>
                  </div>
                  <h1 className="my-1 text-xl font-medium">{post?.title}</h1>
                  <p className="my-3 text-sm">{post?.body}</p>
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
                          <span className="font-bold">
                            {post.commentCount} Comments
                          </span>
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
            )}
          </div>
        </div>
        {post?.sub && <Sidebar sub={post.sub} />}
      </div>
    </>
  );
};

export default PostPage;
