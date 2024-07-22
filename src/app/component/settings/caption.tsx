"use client";
const Caption = () => {
  return (
    <div className="mt-10 w-[75%]">
      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="mr-2 h-5 w-5 text-blue-600 border-gray-300 rounded"
          />
          <label className="text-gray-700">Show Captions</label>
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700">Caption Language</label>
          <select className="mt-1 p-3 border border-gray-300 rounded-md">
            <option>English</option>
            <option>German</option>
            <option>Spanish</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700">Caption Font Size</label>
          <select className="mt-1 p-3 border border-gray-300 rounded-md">
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700">Caption Spped</label>
          <select className="mt-1 p-3 border border-gray-300 rounded-md">
            <option>Slow</option>
            <option>Medium</option>
            <option>Fast</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Caption;
