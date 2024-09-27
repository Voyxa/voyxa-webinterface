"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import Snowfall from "../component/Snowfall";

const AddData = () => {
  const { data: session } = useSession();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [industry, setIndustry] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (session) {
      setEmail(session.user?.email || "");
      // Don't set password from session; manage securely
      // setPassword("user's password"); // REMOVE THIS LINE
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const signupData = {
      email_id: email,
      first_name: firstName,
      last_name: lastName,
      user_phone_number: phoneNumber,
      company,
      industry,
      password,
    };

    const mutation = `
      mutation updateUserDetails($userDetails: UserInputDto!) {
        updateUserDetails(userDetails: $userDetails) {
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
      const response = await fetch("http://localhost:3000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          // "Authorization": session?.accessToken ? `Bearer ${session.accessToken}` : '', // Conditional access
        },
        body: JSON.stringify({
          query: mutation,
          variables,
        }),
      });

      const result = await response.json();
      if (result.errors) {
        setError(result.errors[0].message || "Add user data failed. Please try again.");
      } else {
        const userData = result.data.updateUserDetails;
        const signInResponse = await signIn("credentials", {
          redirect: false,
          email: userData.email_id,
          password,
        });

        if (signInResponse?.error) {
          setError(signInResponse.error);
        } else {
          window.location.href = "/calling";
        }
      }
    } catch (error) {
      console.error("Signup Error:", error);
      setError("Add user data failed. Please try again.");
    }
  };

  return (
    <div
      className="flex min-h-full flex-1 max-w-full justify-center px-4 sm:px-6 lg:px-10 py-[20px]"
      style={{
        backgroundImage: "url(/background.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
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
                className="mr-3"
              />
            </Link>
            <h2 className="title-lg m-auto text-primary">Add additional data</h2>
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
            <Link href="/calling">
             
              <button type="submit" className="submit-btn gradient-bg">
                Save
              </button>
              </Link>
             
              <Link href="/login">
                <button type="button" className="google-btn">
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddData;
