import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const Register: NextPage = () => {
  return (
    <div className="flex">
      <Head>
        <title>Register</title>
      </Head>
      <div
        className="w-40 h-screen bg-center bg-cover"
        style={{ backgroundImage: 'url(./images/bricks.jpeg)' }}
      ></div>
      <div className="flex flex-col justify-center pl-6">
        <div className="w-[17.5rem]">
          <h1 className="mb-2 text-lg font-medium">Sign Up</h1>
          <p className="mb-10 text-xs">
            By continuing, you agree to our User Agreement and Privacy Policy
          </p>
          <form>
            <div className="mb-6 ">
              <input
                type="checkbox"
                className="mr-1 cursor-pointer "
                name="agreement"
                id="agreement"
              />
              <label htmlFor="agreement" className="text-xs cursor-pointer ">
                I agree to get emails about cool stuff on Reddit
              </label>
            </div>
            <div className="mb-2">
              <input
                type="text"
                className="w-full px-3 py-2 bg-gray-100 border border-gray-400 rounded"
                name="email"
                placeholder="Email"
              />
            </div>
            <div className="mb-2">
              <input
                type="text"
                className="w-full px-3 py-2 bg-gray-100 border border-gray-400 rounded"
                name="username"
                placeholder="Username"
              />
            </div>
            <div className="mb-2">
              <input
                type="text"
                className="w-full px-3 py-2 bg-gray-100 border border-gray-400 rounded"
                name="password"
                placeholder="Password"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 mb-4 text-sm font-bold text-white uppercase bg-blue-500 border border-blue-500 rounded"
            >
              Sign Up
            </button>
          </form>
          <small>
            Already a redditor?
            <Link href="/login">
              <a className="ml-1 text-blue-500 uppercase">Login</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Register;
