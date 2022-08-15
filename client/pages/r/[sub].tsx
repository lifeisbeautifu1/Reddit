import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState, createRef } from 'react';

import { ISub } from '../../interfaces';
import { useAuthState } from '../../context/auth';
import { Post, Sidebar } from '../../components';

const Sub = () => {
  const [ownSub, setOwnSub] = useState(false);
  const [sub, setSub] = useState<ISub | null>(null);
  const [refetch, setRefetch] = useState(false);

  const { authenticated, user } = useAuthState();

  const router = useRouter();
  const fileInputRef = createRef<HTMLInputElement>();
  const subName = router.query.sub;

  useEffect(() => {
    if (!sub) return;
    setOwnSub(authenticated && user?.username === sub.username);
  }, [sub]);

  useEffect(() => {
    const fetchSub = async () => {
      if (subName) {
        try {
          const { data } = await axios.get('/subs/' + subName);
          setSub(data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchSub();
  }, [subName, refetch]);

  const openFileInput = (type: string) => {
    if (!ownSub) return;
    if (fileInputRef) {
      if (fileInputRef.current) {
        fileInputRef.current.name = type;
        fileInputRef.current.click();
      }
    }
  };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && fileInputRef.current) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', fileInputRef.current.name);
      try {
        await axios.post(`/subs/${sub?.name}/image`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setRefetch(!refetch);
      } catch (error) {
        console.log(error);
      }
    }
  };

  let postMarkup;
  if (!sub) postMarkup = <p className="text-lg text-center">Loading...</p>;
  else if (sub.posts.length === 0)
    postMarkup = <p className="text-lg text-center">No posts submitted yet</p>;
  else
    postMarkup = sub.posts.map((post) => (
      <Post
        refetch={refetch}
        setRefetch={setRefetch}
        key={post.identifier}
        post={post}
      />
    ));
  return (
    <>
      <Head>
        <title>{sub?.title}</title>
      </Head>
      {sub && (
        <>
          <input
            type="file"
            hidden={true}
            ref={fileInputRef}
            onChange={uploadImage}
          />
          <div>
            <div
              className={`${ownSub && 'cursor-pointer'}`}
              onClick={() => openFileInput('banner')}
            >
              {sub.bannerUrl ? (
                <div
                  className={`h-56 ${
                    !sub.bannerUrl ? 'bg-blue-500' : 'bg-white'
                  }`}
                  style={{
                    backgroundImage: `url(${sub.bannerUrl})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'contain',
                  }}
                ></div>
              ) : (
                <div className="h-20 bg-blue-500"></div>
              )}
            </div>
            <div className="h-20 bg-white">
              <div className="container relative flex">
                <div className="absolute -top-4">
                  <Image
                    src={sub.imageUrl}
                    alt="Sub"
                    className={`rounded-full object-cover ${
                      ownSub && 'cursor-pointer'
                    }`}
                    onClick={() => openFileInput('image')}
                    objectFit="contain"
                    objectPosition="center"
                    width={80}
                    height={80}
                  />
                </div>
                <div className="pt-1 pl-24">
                  <div className="flex items-center">
                    <h1 className="mb-1 text-3xl font-bold">{sub.title}</h1>
                  </div>
                  <p className="text-sm font-bold text-gray-500">
                    /r/{sub.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="container px-4 flex gap-4 flex-col-reverse md:flex-row pt-5">
        {sub && <div className="w-full sm:w-[40rem]">{postMarkup}</div>}
        <Sidebar sub={sub!} />
      </div>
    </>
  );
};

export default Sub;
