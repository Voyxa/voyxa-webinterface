"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-10">
          <Link href="/" className="home-btn">
            HomePage
          </Link>
          <Link href="" className="home-btn">
            Pricing
          </Link>
          <Link href="" className="home-btn">
            Book a Call
          </Link>
          <Link href="/login" className="home-btn">
            Login
          </Link>
          <Link href="/signup" className="home-btn">
            SignUp
          </Link>
        </div>
      </div>
    </div>
  );
}
