import React from 'react';

  
const StepOne = () => {
  return (
    <div className="flex w-full">
    {/* Sidebar */}
   
   

    {/* Main Content */}
    <div className="w-full p-6">
      <h1 className="text-2xl font-bold">Agent Customization</h1>
      {/* Name Section */}
      <div className="mt-6 bg-white p-4 rounded shadow">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          placeholder="Set the agent’s name (e.g., Joe, Victoria)"
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      {/* Voice & Language Section */}
      <div className="mt-6 bg-white p-4 rounded shadow">
        <label className="block text-sm font-medium text-gray-700">Voice & Language</label>
        <textarea
          placeholder="Choose a voice for the agent that matches your brand identity or audience preference."
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      {/* Personality Section */}
      <div className="mt-6 bg-white p-4 rounded shadow">
        <label className="block text-sm font-medium text-gray-700">Personality</label>
        <select className="mt-1 block w-full border border-gray-300 rounded-md p-2">
          <option>Natural</option>
          <option>Professional</option>
          <option>Enthusiastic</option>
        </select>
      </div>

      {/* Timezone Section */}
      <div className="mt-6 bg-white p-4 rounded shadow">
        <label className="block text-sm font-medium text-gray-700">Timezone</label>
        <select className="mt-1 block w-full border border-gray-300 rounded-md p-2">
          <option>UTC</option>
          <option>GMT</option>
          <option>PST</option>
          <option>EST</option>
        </select>
      </div>
    </div>
  </div>
  );
};

export default StepOne;