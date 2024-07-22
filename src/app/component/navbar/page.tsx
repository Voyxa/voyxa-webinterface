import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-primary">
              <Image
                src="/logo.png"
                alt="Description of image"
                width={50}
                height={50}
              />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/home" className="text-gray-700 hover:text-primary">
              <div className="p-[10px] bg-gray-200 border border-gray-300 hover:bg-gray-300">
                <div className="w-[20px] h-[3px] bg-gray-500 mb-1"></div>
                <div className="w-[20px] h-[3px] bg-gray-500 mb-1"></div>
                <div className="w-[20px] h-[3px] bg-gray-500"></div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
