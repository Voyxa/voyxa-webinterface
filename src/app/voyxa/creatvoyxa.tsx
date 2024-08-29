import React from 'react';

const StartVoyxa = () => {
  return (
    <div className="flex  ">
      {/* Main Content */}
      <div className="flex-1 p-8 ">
        <h2 className="text-3xl font-bold mb-6">Create a Voyxa</h2>
        <p className="mb-8">Create your Voyxa and choose its role according to your use case.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Sales Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-15h2v5h-2zm0 6h2v2h-2z" />
              </svg>
              <h3 className="text-xl font-semibold ml-2">Sales</h3>
            </div>
            <p>Drive sales by offering detailed product and service information and facilitating transactions.</p>
          </div>

          {/* Support Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-15h2v5h-2zm0 6h2v2h-2z" />
              </svg>
              <h3 className="text-xl font-semibold ml-2">Support</h3>
            </div>
            <p>Handle customer support by answering questions, solving issues, and providing detailed information.</p>
          </div>

          {/* Personal Secretary Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-15h2v5h-2zm0 6h2v2h-2z" />
              </svg>
              <h3 className="text-xl font-semibold ml-2">Personal Secretary</h3>
            </div>
            <p>Customize your personal secretary to efficiently manage appointments, handle messages, and provide information.</p>
          </div>

          {/* Custom Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-15h2v5h-2zm0 6h2v2h-2z" />
              </svg>
              <h3 className="text-xl font-semibold ml-2">Custom</h3>
            </div>
            <p>This option lets you create a customized Voyxa/Flow for any use case, with precise and detailed instructions.</p>
            <p className="text-gray-500 mt-2">Coming Soon</p>
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default StartVoyxa;
