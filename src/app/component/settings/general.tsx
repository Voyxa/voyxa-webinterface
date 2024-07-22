"use client";
const General = () => {
  return (
    <div className="mt-10 w-[75%]">
      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="mr-2 h-5 w-5 text-blue-600 border-gray-300 rounded"
          />
          <label className="text-gray-700">Mute Notifications</label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            className="mr-2 h-5 w-5 text-blue-600 border-gray-300 rounded"
          />
          <label className="text-gray-700">Play Sound for Notifications</label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            className="mr-2 h-5 w-5 text-blue-600 border-gray-300 rounded"
          />
          <label className="text-gray-700">Enable Dark Mode</label>
        </div>
      </div>
    </div>
  );
};

export default General;
