"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { signIn,useSession } from "next-auth/react"; // Import the signIn function
import Snowfall from '../component/Snowfall'; // Adjust the import path as necessary


interface UserLoginResponse {
  userLogin: {
    first_name: string;
    last_name: string;
    user_phone_number: string;
    email_id: string;
    company: string;
    industry: string;
    access_token: string;
    refresh_token: string;
  };
}
const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { data: session, update: updateSession } = useSession();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");


    try {
      // Use NextAuth's signIn with CredentialsProvider
      const result = await signIn('credentials', {
        redirect: false,
        login_id: email,    // Pass email directly
        password: password,  // Pass password directly
      });

      if (result?.error) {
        setError(result.error);
      } else {
        // Successful login
        // You may want to retrieve user data and set session here if needed
        window.location.href = '/calling'; // Redirect to calling page
      }
    } catch (error: any) {
      console.error('Login Error:', error);
      setError('Login failed. Please check your credentials.');
    }
  };

  const handleGoogleLogin = async () => {
    // Use NextAuth's signIn function for Google login
    signIn('google', { callbackUrl: '/calling' });
  };

  const handleMicrosoftLogin = async () => {
    // Use NextAuth's signIn function for Microsoft login
    signIn('azure-ad', { callbackUrl: '/calling' });
  };

  return (
    <div className="flex min-h-full flex-1 max-w-full px-4 sm:px-6 lg:px-10 py-[20px]" style={{
      backgroundImage: 'url(/background.jpg)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    }}>
      <Snowfall /> {/* Add the Snowfall component here */}
      <div className="flex flex-1 flex-col justify-center px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 w-[50%]">
        <div className="bg-white p-10 rounded-lg shadow-lg w-[100%] max-w-[500px] m-auto">
          <div className="w-full flex justify-center mb-4">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Description of image"
                width={50}
                height={50}
              />
            </Link>
            <h2 className="title-lg m-auto">Login to your account</h2>
          </div>

          <label className="title-md">
            Welcome back!<br /> Enter your credentials to access your account
          </label>

          {error && <div className="text-red-500">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  className="form-checkbox"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-gray-700"
                >
                  Remember me
                </label>
              </div>
              <div>
                <Link
                  href="/login/email"
                  className="text-blue-500 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
            <button type="submit" className="submit-btn gradient-bg">
              Sign in
            </button>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <button type="button" onClick={handleGoogleLogin} className="google-btn">
                <Image
                  src="/google-icon.svg"
                  alt="Google icon"
                  width={20}
                  height={20}
                  className="mr-4"
                />
                Google
              </button>
              <button type="button" onClick={handleMicrosoftLogin} className="google-btn">
                <Image
                  src="/icons8-microsoft.svg"
                  alt="Microsoft icon"
                  width={20}
                  height={20}
                  className="mr-4"
                />
                Microsoft
              </button>
            </div>

          </form>
          <p className="mt-6 text-center text-gray-600">
            Don&apos;t have an account?
            <Link href="/signup" className="link-txt">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="right-bg">
          <div className="right-txt-group">
            <div>
              <h1>What is Voyxa?</h1>
              <h1 className="text-[20px]">
                Our project aims to revolutionize Help Desk customer support by
                developing advanced proprietary AI for call answering that
                leverages VoIP numbers and cutting-edge natural language
                processing (NLP) technologies, in particular GPT models.
              </h1>
            </div>
            <div>
              <p className="text-white-600 text-[12px]">
                By combining advanced NLP techniques, GPT models, and speech
                processing libraries, we expect a significant improvement in
                customer service efficiency and satisfaction.
              </p>
              <button
                type="submit"
                className="mt-4 w-full border border-white-300 bg-transparent text-[15px] text-white py-3 rounded-[5px] transition duration-300 h-[30px] flex items-center justify-center hover:bg-opacity-40 hover:bg-gray-300 transition duration-300"
              >
                Enterprise inquiry
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
