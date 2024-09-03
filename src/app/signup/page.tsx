"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react"; // Import the signIn function

const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [industry, setIndustry] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const signupData = {
      email,
      firstName,
      lastName,
      phoneNumber,
      company,
      industry,
      password,
    };

    const mutation = `
      mutation RegisterUser($userDetails: UserInputDto!) {
        registerUser(userDetails: $userDetails) {
          first_name
          last_name
          user_phone_number
          email_id
          company
          industry
          access_token
          refresh_token
        }
      }
    `;

    const variables = { userDetails: signupData };
    console.log(variables)
    try {
      const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST', 
        mode: 'no-cors', // This will bypass CORS, but you won't have access to the response data
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: mutation,
          userDetails: signupData,
        }),
      });

      const result = await response.json();
      if (result.errors) {
        setError(result.errors[0].message || 'Signup failed. Please try again.');
      } else {
        const userData = result.data.registerUser;

        // Automatically sign in the user with NextAuth
        const signInResponse = await signIn('credentials', {
          redirect: false,
          email: userData.email_id,
          password, // You may need to adjust this depending on your authentication logic
        });

        if (signInResponse?.error) {
          setError(signInResponse.error);
        } else {
          window.location.href = '/calling'; // Redirect to the dashboard after successful signup and sign-in
        }
      }
    } catch (error) {
      console.error('Signup Error:', error);
      setError('Signup failed. Please try again.');
    }
  };

  const handleGoogleSignup = async () => {
    signIn('google', { callbackUrl: '/calling' }); // Use signIn for Google signup
  };

  const handleMicrosoftSignup = async () => {
    signIn('azure-ad', { callbackUrl: '/calling' }); // Use signIn for Microsoft signup
  };

  return (
    <div className="flex min-h-full flex-1 max-w-full px-4 sm:px-6 lg:px-10 py-[20px]" style={{
      backgroundImage: 'url(/background.jpg)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    }}>
      <div className="flex flex-1 flex-col justify-center px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 w-[50%]">
        <div className="bg-white p-10 rounded-lg shadow-lg w-[100%] max-w-[500px] m-auto">
          <div className="w-full flex justify-center mb-4">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Description of image"
                width={50}
                height={50}
                className="mr-3"
              />
            </Link>
          </div>
          <h2 className="title-lg">Create account</h2>
          <label className="title-md">
            Sign up for an account to get started
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
              <input
                type="text"
                className="form-input"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
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
