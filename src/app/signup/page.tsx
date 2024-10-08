"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Snowfall from '../component/Snowfall';
import { GraphQLClient } from 'graphql-request';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // Import the phone input CSS

const Signup = () => {
  const [email_id, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [industry, setIndustry] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false); // New state for success notification

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess(false); // Reset success state before submitting

    const signupData = {
      email_id,
      first_name: firstName,
      last_name: lastName,
      user_phone_number: phoneNumber,
      company,
      industry,
      password,
    };

    const client = new GraphQLClient('http://localhost:3000/graphql');

    const signupMutation = `
      mutation RegisterUser($userDetails: UserInputDto!) {
        registerUser(userDetails: $userDetails) {
          first_name
          last_name
          email_id
          user_phone_number
          company
          industry
        }
      }
    `;

    try {
      const response = await client.request(signupMutation, {
        userDetails: signupData,
      });

      // Show success notification
      setSuccess(true);

      // Automatically sign in the user with NextAuth
      const signInResponse = await signIn('credentials', {
        redirect: false,
        login_id:email_id,
        password,
      });

      if (signInResponse?.error) {
        setError(signInResponse.error);
      } else {
        window.location.href = '/login'; // Redirect after successful signup and sign-in
      }
    } catch (error) {
      console.error('Signup Error:', error);
      setError('Signup failed. Please try again.');
    }
  };

  const handleGoogleSignup = async () => {
    signIn('google', { callbackUrl: '/adddata' });
  };

  const handleMicrosoftSignup = async () => {
    signIn('azure-ad', { callbackUrl: '/adddata' });
  };

  return (
    <div className="flex min-h-full flex-1 max-w-full px-4 sm:px-6 lg:px-10 py-[20px]" style={{
      backgroundImage: 'url(/background.jpg)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    }}>
      <Snowfall />
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
            <h2 className="title-lg m-auto">Create account</h2>
          </div>
          <label className="title-md">&nbsp;</label>

          {error && <div className="text-red-500">{error}</div>}
          {success && (
            <div className="bg-green-500 text-white p-4 rounded-lg mb-4">
              Registration successful! You can now log in.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                value={email_id}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex">
              <div className="mb-2 mr-2 w-[50%]">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-2 ml-2 w-[50%]">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="mb-2">
              <label className="form-label">Phone Number</label>
              <PhoneInput
                country={'us'} // Default country, you can change it
                value={phoneNumber}
                onChange={(value: string) => setPhoneNumber(value)}
                inputStyle={{ width: '100%', height:'40px' }} // Custom styling for input
                enableSearch={true} // Enable country search feature
                
              />
            </div>
            
            <div className="mb-2">
              <label className="form-label">Company</label>
              <input
                type="text"
                className="form-input"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Industry</label>
              <input
                type="text"
                className="form-input"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-btn gradient-bg">
              Continue with Email
            </button>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <button type="button" onClick={handleGoogleSignup} className="google-btn">
                <Image
                  src="/google-icon.svg"
                  alt="Google icon"
                  width={20}
                  height={20}
                  className="mr-4"
                />
                Google
              </button>
              <button type="button" onClick={handleMicrosoftSignup} className="google-btn">
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
            Already have an account?
            <Link href="/login" className="link-txt">
              Log in
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

export default Signup;
