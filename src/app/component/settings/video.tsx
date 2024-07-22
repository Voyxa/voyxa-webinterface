"use client";
const Video = () => {
  return (
    <div className="mt-10 w-[75%]">
      <div className="space-y-4">
        <div className="flex flex-col">
          <label className="text-gray-700">Camera</label>
          <select className="mt-1 p-3 border border-gray-300 rounded-md">
            <option>Default Camera</option>
            <option>External Camera</option>
          </select>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            className="mr-2 h-5 w-5 text-blue-600 border-gray-300 rounded"
          />
          <label className="text-gray-700">HD Video</label>
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700">Background</label>
          <select className="mt-1 p-3 border border-gray-300 rounded-md">
            <option>None</option>
            <option>Blur</option>
            <option>Virtual Background</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Video;
