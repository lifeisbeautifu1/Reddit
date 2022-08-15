import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

import { Post } from '../../components';
import { IPost, IComment, IUser } from '../../interfaces';

const UserPage = () => {
  const [data, setData] = useState<any>(null);
  const router = useRouter();
  const { username } = router.query;
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (username) {
          const res = await axios.get('/users/' + username);
          setData(res.data);
        }
      } catch (error) {
        console.log(error);
        router.push('/');
      }
    };
    fetchData();
  }, [username]);

  return (
    <>
      <Head>
        <title>{data?.user.username}</title>
      </Head>
      {data && (
        <div className="container flex pt-5">
          <div className="w-full">
            {data.submissions.map((s: any) => {
              if (s.type === 'Post') {
                const post: IPost = s;
                return <Post key={post.identifier} post={post} />;
              } else {
                const comment: IComment = s;
                return (
                  <div
                    key={comment.identifier}
                    className="flex mb-4 bg-white rounded"
                  >
                    <div className="flex-shrink-0 w-10 py-4 text-center bg-gray-200 rounded-l">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 m-auto text-gray-500 "
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
                    </div>
                    <div className="w-full p-2">
                      <p className="mb-2 text-xs text-gray-500">
                        {comment.username}
                        <span> commented on </span>
                        <Link href={comment?.post?.url!}>
                          <a className="font-semibold cursor-pointer hover:underline">
                            {comment?.post?.title}
                          </a>
                        </Link>
                        <span className="mx-1">•</span>
                        <Link href={`/r/${comment?.post?.subName!}`}>
                          <a className="text-black cursor-pointer hover:underline">
                            /r/{comment?.post?.subName}
                          </a>
                        </Link>

                        <span className="mx-1 hover:underline">
                          {dayjs(comment.createdAt).fromNow()}
                        </span>
                      </p>

                      <hr />
                      <p>{comment.body}</p>
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <div className="ml-6 w-80">
            <div className="bg-white rounded">
              <div className="p-3 bg-blue-500 rounded-t">
                <Image
                  src={
                    'https://avatars.githubusercontent.com/u/44026893?s=400&v=4'
                  }
                  alt={data?.user.username}
                  width={64}
                  height={64}
                  objectFit="cover"
                  className="w-16 h-16 mx-auto border-2 border-white rounded-full"
                />
              </div>
              <div className="p-3 text-center">
                <h1 className="mb-3 text-xl">{data.user?.username}</h1>
                <hr />
                <p className="mt-3">
                  Joined {dayjs(data.user.createdAt).format('MMM YYYY')}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserPage;
