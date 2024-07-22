"use client";
import Navbar from "./component/navbar/page";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-10">
          <Link href="/calling" className="home-btn">
            Calling and Record
          </Link>
        </div>
      </div>
    </div>
  );
}
