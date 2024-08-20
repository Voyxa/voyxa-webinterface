"use client";
import Link from "next/link";
import Image from "next/image";

const Login = () => {
  return (
    <div className="flex min-h-full flex-1  max-w-full px-4 sm:px-6 lg:px-10 py-[20px] "  style={{
      backgroundImage: 'url(/background.jpg)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    }}>  <div className="flex flex-1 flex-col justify-center px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 w-[50%]">
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

          <form>
            <div className="mb-2">
              <label className="form-label">Email</label>
              <input type="email" className="form-input" required />
            </div>
            <div className="flex">
              <div className="mb-2 mr-2 w-[50%]">
                <label className="form-label">First Name</label>
                <input type="text" className="form-input" required />
              </div>
              <div className="mb-2 ml-2 w-[50%]">
                <label className="form-label">Last Name</label>
                <input type="text" className="form-input" required />
              </div>
            </div>
            <div className="mb-2">
              <label className="form-label">Phone Number</label>
              <input type="text" className="form-input" required />
            </div>
            <div className="mb-2">
              <label className="form-label">Company</label>
              <input
                type="text"
                className="form-input"
                required
                placeholder="Optional"
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Industry</label>
              <input
                type="text"
                className="form-input"
                required
                placeholder="Optional"
              />
            </div>
            <div className="mb-6">
              <label className="form-label">Password</label>
              <input type="password" className="form-input" required />
            </div>
            <button type="submit" className="submit-btn gradient-bg">
              Continue with Email
            </button>
            <div className="grid grid-cols-2 gap-4">
              <button type="submit" className="google-btn">
                <Image
                  src="/google-icon.svg"
                  alt="Description of image"
                  width={20}
                  height={20}
                  className="mr-4"
                />
                Google
              </button>
              <button type="submit" className="google-btn">
                <Image
                  src="/icons8-microsoft.svg"
                  alt="Description of image"
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
                leverages VoIP numbers and cutting0dedge natural language
                processing (NLP) technologies, in particular GPT models.
              </h1>
            </div>
            <div>
              <p className="text-white-600 text-[12px]">
                By combining advanced NLP techniques, GPT models and speech
                processing libraries, we expect a significant improvenment in
                customer service efficiently and satisfaction.
              </p>
              <button
                type="submit"
                className="mt-4 w-full border border-white-300 bg-transparent text-[15px]  text-white py-3 rounded-[5px] transition duration-300 h-[30px] flex items-center justify-center hover:bg-opacity-40 hover:bg-gray-300 transition duration-300"
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
