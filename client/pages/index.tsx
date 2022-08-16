import type { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { IPost } from '../interfaces';
import { Post, HomeSidebar } from '../components';

const Home: NextPage = ({}) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [observedPost, setObservedPost] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

    const description =
      "Reddit is a network of communities based on people's interests. Find communities you're interested in, and become part of an online community!";
    const title = 'readit: the front page of the internet';

    useEffect(() => {
      if (!posts || !posts.length) return;
      const id = posts.at(-1)?.identifier;

      if (id !== observedPost && id) {
        setObservedPost(id);
        observeElement(document.getElementById(id)!);
      }
    }, [posts]);

    const observeElement = (element: HTMLElement) => {
      if (!element) return;
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            console.log('reached bottom');
            setCurrentPage(currentPage + 1);
            observer.unobserve(element);
          }
        },
        { threshold: 1 }
      );
      observer.observe(element);
    };

    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const { data } = await axios.get('/posts/?page=' + currentPage);
          setPosts([...posts, ...data]);
        } catch (error) {
          console.log(error);
        }
      };
      fetchPosts();
    }, [currentPage]);

    return (
      <div className="px-4">
        <Head>
          <title>Reddit: the frontpage of the internet</title>
          <link rel="icon" href="./favicon.ico" />
          <meta name="description" content={description}></meta>
          <meta property="og:description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="twitter:description" content={description} />
          <meta property="twitter:title" content={title} />
        </Head>
        <div className="container flex pt-4">
          <div className="w-full md:w-[40rem]">
            {posts.map((post) => {
              return (
                <Post setPosts={setPosts} key={post.identifier} post={post} />
              );
            })}
          </div>
          <HomeSidebar />
        </div>
      </div>
    );
};;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   try {
//     const { data } = await axios.get('/posts');
//     console.log(data);
//     return {
//       props: {
//         posts: data,
//       },
//     };
//   } catch (error) {
//     return {
//       props: { error: 'Something went wrong' },
//     };
//   }
// };

export default Home;
