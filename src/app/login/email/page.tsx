"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react"; // Import the signIn function
import Snowfall from '../../component/Snowfall'; // Adjust the import path as necessary

const ResetMail = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Call to your login API
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      // Handle successful login (e.g., redirect to dashboard)
      window.location.href = '/calling';
    } else {
      const data = await response.json();
      setError(data.message || 'Login failed. Please check your credentials.');
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
            <h2 className="title-lg m-auto" >Reset password</h2>

          </div>

          <label className="title-md">
            Enter the email address associated with your account, and we&apos;ll
            email you a link to reset your password.
          </label>

          {error && <div className="text-red-500">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <button type="button" className="submit-btn gradient-bg">
                Send Mail
              </button>
              <Link href="/login" >
                <button type="button" className="google-btn">
                  Cancel
                </button>
              </Link>

            </div>

          </form>

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

export default ResetMail;
