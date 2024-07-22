"use client";
const Audio = () => {
  return (
    <div className="mt-10 w-[75%]">
      <div className="space-y-4">
        <div className="flex flex-col">
          <label className="text-gray-700">Microphone</label>
          <select className="mt-1 p-3 border border-gray-300 rounded-md">
            <option>Default Microphone</option>
            <option>External Microphone</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700">Speakers</label>
          <select className="mt-1 p-3 border border-gray-300 rounded-md">
            <option>Default Speakers</option>
            <option>External Speakers</option>
          </select>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            className="mr-2 h-5 w-5 text-blue-600 border-gray-300 rounded"
          />
          <label className="text-gray-700">Mute Microphone on Join</label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            className="mr-2 h-5 w-5 text-blue-600 border-gray-300 rounded"
          />
          <label className="text-gray-700">
            Automatically Adjust Microphone Volume
          </label>
        </div>
      </div>
    </div>
  );
};

export default Audio;
