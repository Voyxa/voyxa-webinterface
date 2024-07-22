"use client";
import Link from "next/link";
import Image from "next/image";

const Login = () => {
  return (
    <div className="flex min-h-full flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-[20px]">
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
          <h2 className="title-lg">Reset password</h2>
          <label className="title-md">
            Enter the email address associated with your account, and we&apos;ll
            email you a link to reset your password.
          </label>

          <form>
            <div className="mb-6">
              <label className="form-label">Email</label>
              <input type="email" className="form-input" required />
            </div>
            <button type="submit" className="submit-btn">
              Sign in
            </button>
            <Link href="/login">
              <button className="cancel-btn">Cancel</button>
            </Link>
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
                className="mt-4 w-full bg-white text-[15px] text-black py-3 rounded-[5px] transition duration-300 h-[30px] flex items-center justify-center"
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
