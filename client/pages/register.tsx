import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';

const Register: NextPage = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    agreement: false,
  });
  const [errors, setErrors] = useState<any>({});

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post('/auth/register', formState);
      router.push('/login');
    } catch (error: any) {
      setErrors(error.response.data);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    });
  };
  return (
    <div className="flex bg-white">
      <Head>
        <title>Register</title>
      </Head>
      <div
        className="h-screen bg-center bg-cover w-36"
        style={{ backgroundImage: 'url(./images/bricks.jpeg)' }}
      ></div>
      <div className="flex flex-col justify-center pl-6">
        <div className="w-[18rem]">
          <h1 className="mb-2 text-lg font-medium">Sign Up</h1>
          <p className="mb-10 text-xs">
            By continuing, you agree to our User Agreement and Privacy Policy
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                className="mr-1 cursor-pointer "
                name="agreement"
                checked={formState.agreement}
                onChange={handleChange}
                id="agreement"
              />
              <label htmlFor="agreement" className="text-xs cursor-pointer ">
                I agree to get emails about cool stuff on Reddit
              </label>
            </div>
            <div className="mb-2">
              <input
                type="text"
                className={`w-full p-3 transition duration-200 border border-gray-300 rounded outline-none bg-gray-50 focus:bg-white hover:bg-white ${
                  errors.email && 'border-red-500'
                }`}
                onChange={handleChange}
                value={formState.email}
                name="email"
                placeholder="Email"
              />
              <small className="text-red-600 font-medim">{errors.email}</small>
            </div>
            <div className="mb-2">
              <input
                type="text"
                className={`w-full p-3 transition duration-200 border border-gray-300 rounded outline-none bg-gray-50 focus:bg-white hover:bg-white ${
                  errors.username && 'border-red-500'
                }`}
                onChange={handleChange}
                value={formState.username}
                name="username"
                placeholder="Username"
              />
              <small className="text-red-600 font-medim">
                {errors.username}
              </small>
            </div>
            <div className="mb-2">
              <input
                type="password"
                className={`w-full p-3 transition duration-200 border border-gray-300 rounded outline-none bg-gray-50 focus:bg-white hover:bg-white ${
                  errors.password && 'border-red-500'
                }`}
                onChange={handleChange}
                value={formState.password}
                name="password"
                placeholder="Password"
              />
              <small className="text-red-600 font-medim">
                {errors.password}
              </small>
            </div>
            <button
              type="submit"
              className="w-full py-2 mb-4 text-sm font-bold text-white uppercase transition duration-200 bg-blue-500 border border-blue-500 rounded hover:bg-blue-500/90"
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
