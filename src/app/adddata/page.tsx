"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react"; // Import the signIn function
import { Button } from 'antd';
const AddData = () => {
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
    try {
      const response = await fetch('http://13.127.87.100:3000/graphql', {
        method: 'POST',
        mode: 'no-cors', // This will bypass CORS, but you won't have access to the response data
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json', // Include Accept header
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
    <div className="flex min-h-full flex-1 max-w-full justify-center px-4 sm:px-6 lg:px-10 py-[20px]" style={{
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
            <h2 className="title-lg m-auto text-primary " >Add additional data</h2>
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <form onSubmit={handleSubmit}>
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
            <div className="mb-6">
              <label className="form-label">Industry</label>
              <input
                type="text"
                className="form-input"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">

              <Button type="primary" className="p-5">
                Save
              </Button>
              <Button type="default" className="p-5">
                Cancel
              </Button>

            </div>


          </form>

        </div>
      </div>

    </div>
  );
};

export default AddData;
