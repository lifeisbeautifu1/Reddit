import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import RedditLogo from '../images/reddit-logo.png';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { useAuthState, useAuthDispatch } from '../context/auth';
import { ISub } from '../interfaces';

const Navbar = () => {
  const [name, setName] = useState('');
  const [subs, setSubs] = useState<ISub[]>([]);
  const [timer, setTimer] = useState<any>(null);

  const { authenticated, loading } = useAuthState();
  const dispatch = useAuthDispatch();
  const router = useRouter();

  useEffect(() => {
    if (name.trim() === '') {
      setSubs([]);
      return;
    }
    searchSubs();
  }, [name]);

  const searchSubs = async () => {
    clearTimeout(timer);
    setTimer(
      setTimeout(async () => {
        try {
          const { data } = await axios.get('/subs/search/' + name);
          setSubs(data);
        } catch (error) {
          console.log(error);
        }
      }, 250)
    );
  };

  const goToSub = (subName: string) => {
    console.log(subName);
    router.push('/r/' + subName);
    setName('');
  };

  const logout = async () => {
    try {
      await axios.get('/auth/logout');
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="fixed inset-x-0 top-0 z-10 flex items-center justify-between h-12 px-5 bg-white">
      <div className="flex item-center">
        <Link href="/">
          <a className="w-8 h-8 mr-2">
            <Image src={RedditLogo} alt="Reddit" />
          </a>
        </Link>
        <span className="hidden lg:inline text-2xl font-semibold">
          <Link href="/">Reddit</Link>
        </span>
      </div>
      <div className="w-full relative items-center bg-gray-100 border rounded flex hover:border-blue-500 max-w-[40rem] mx-4 hover:bg-white">
        <span className="pl-4 pr-3 text-gray-500">
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>

        <input
          // onBlur={() => {
          //   setSubs([]);
          //   setName('');
          // }}
          type="text"
          placeholder="Search"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="py-1 pr-3 bg-transparent rounded w-full focus:outline-none"
        />
        <div className="absolute left-0 right-0 bg-white top-[110%]">
          {subs?.map((sub) => (
            <div
              key={sub.name}
              className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-200"
              onClick={() => goToSub(sub.name)}
            >
              <Image
                src={sub.imageUrl}
                height={32}
                width={32}
                alt={sub.name}
                className="rounded-full"
              />
              <div className="ml-4 text-sm">
                <p className="font-medium">{sub.name}</p>
                <p className="text-gray-600">{sub.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {authenticated ? (
        <button
          className="w-20 md:w-32 py-1 leading-5 hollow blue button"
          onClick={logout}
        >
          Logout
        </button>
      ) : (
        !loading && (
          <div className="flex gap-4">
            <Link href="/login">
              <a className="w-20 md:w-32 py-1 leading-5 hollow blue button">
                Log In
              </a>
            </Link>
            <Link href="/register">
              <a className="w-20 md:w-32 py-1 leading-5 blue button">Sign Up</a>
            </Link>
          </div>
        )
      )}
    </div>
  );
};

export default Navbar;
