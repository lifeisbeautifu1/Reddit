import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Sidebar } from '../../../components';
import { IPost, ISub } from '../../../interfaces';
import { GetServerSideProps } from 'next';

const SubmitPage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [sub, setSub] = useState<ISub | null>(null);

  const router = useRouter();

  const { sub: subName } = router.query;

  useEffect(() => {
    const fetchSub = async () => {
      try {
        if (subName) {
          const { data } = await axios.get('/subs/' + subName);
          setSub(data);
        }
      } catch (error) {
        console.log(error);
        router.push('/');
      }
    };
    fetchSub();
  }, [subName]);

  const submitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.trim() === '') return;
    try {
      const { data: post } = await axios.post<IPost>('/posts', {
        title: title.trim(),
        body,
        sub: sub?.name,
      });
      router.push(`/r/${subName}/${post.identifier}/${post.slug}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container flex pt-5">
      <Head>
        <title>Submit to Reddit</title>
      </Head>
      <div className="w-[40rem]">
        <div className="p-4 bg-white rounded">
          <h1 className="mb-3 text-lg">Submit a post to /r/{subName}</h1>
          <form onSubmit={submitPost}>
            <div className="relative mb-2">
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded  focus:outline-none"
                placeholder="Title"
                maxLength={300}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="absolute right-[10px] top-[13px] mb-2 text-sm text-gray-500 select-none focus:border-gray-600">
                {title.trim().length}/300
              </div>
            </div>
            <textarea
              className="w-full p-3 border bordre-gray-300 rounded focus:outline-none focus:border-gray-600"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Text (optional)"
              rows={4}
            ></textarea>
            <div className="flex justify-end">
              <button
                className="px-3 py-1 blue button"
                type="submit"
                disabled={title.trim() === ''}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      {sub && <Sidebar sub={sub} />}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const cookie = req.headers.cookie;
    if (!cookie) throw new Error('Missing auth token cookie');
    await axios.get('/auth/me', { headers: { cookie } });
    return {
      props: {},
    };
  } catch (error) {
    res.writeHead(307, { Location: '/login' }).end();
    return {
      props: {},
    };
  }
};

export default SubmitPage;
