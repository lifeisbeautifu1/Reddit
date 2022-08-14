import { useRouter } from 'next/router';
import { Post } from '../../components';
import { ISub } from '../../interfaces';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Sub = () => {
  const router = useRouter();
  const subName = router.query.sub;
  const [sub, setSub] = useState<ISub>({ posts: [] });
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
  }, [subName]);

  let postMarkup;
  if (!sub) postMarkup = <p className="text-lg text-center">Loading...</p>;
  else if (sub.posts.length === 0)
    postMarkup = <p className="text-lg text-center">No posts submitted yet</p>;
  else
    postMarkup = sub.posts.map((post) => (
      <Post key={post.identifier} post={post} />
    ));
  return (
    <div className="w-full lg:w-[976px] mx-auto flex pt-5">
      {sub && <div className="w-[40rem]">{postMarkup}</div>}
    </div>
  );
};

export default Sub;
