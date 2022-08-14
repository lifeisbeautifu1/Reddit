import Link from 'next/link';
import Image from 'next/image';
import RedditLogo from '../images/reddit-logo.png';
import { FaSearch } from 'react-icons/fa';

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
          <FaSearch />
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
