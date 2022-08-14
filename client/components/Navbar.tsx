import Link from 'next/link';
import Image from 'next/image';
import RedditLogo from '../images/reddit-logo.png';


const Navbar = () => {
  return (
    <div className="fixed inset-x-0 top-0 z-10 flex items-center justify-between h-12 px-5 bg-white">
      <div className="flex item-center">
        <Link href="/">
          <a className="w-8 h-8 mr-2">
            <Image src={RedditLogo} alt="Reddit" />
          </a>
        </Link>
        <span className="text-2xl font-semibold">
          <Link href="/">Reddit</Link>
        </span>
      </div>
      <div className="items-center hidden bg-gray-100 border rounded lg:flex hover:border-blue-500 hover:bg-white">
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
          type="text"
          placeholder="Search"
          className="py-1 pr-3 bg-transparent rounded w-[40rem] focus:outline-none"
        />
      </div>
      <div className="flex gap-4">
        <Link href="/login">
          <a className="w-32 py-1 leading-5 hollow blue button">Log In</a>
        </Link>
        <Link href="/register">
          <a className="w-32 py-1 leading-5 blue button">Sign Up</a>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
