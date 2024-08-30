import React from 'react';
import { CheckCircleOutlined,CarryOutOutlined, CheckOutlined, FormOutlined } from '@ant-design/icons';
import {  Tree } from 'antd';
import type { TreeDataNode } from 'antd';
import { faL } from '@fortawesome/free-solid-svg-icons';
const treeData: TreeDataNode[] = [
    {
      title: 'parent 1',
      key: '0-0',
      icon: <CheckCircleOutlined />,
      children: [
        {
          title: 'parent 1-0',
          key: '0-0-0',
          icon: <CarryOutOutlined />,
          children: [
            { title: 'leaf', key: '0-0-0-0', icon: <CarryOutOutlined /> },
            {
              title: (
                <>
                  <div>multiple line title</div>
                  <div>multiple line title</div>
                </>
              ),
              key: '0-0-0-1',
              icon: <CarryOutOutlined />,
            },
            { title: 'leaf', key: '0-0-0-2', icon: <CarryOutOutlined /> },
          ],
        },
        {
          title: 'parent 1-1',
          key: '0-0-1',
          icon: <CarryOutOutlined />,
          children: [{ title: 'leaf', key: '0-0-1-0', icon: <CarryOutOutlined /> }],
        },
        {
          title: 'parent 1-2',
          key: '0-0-2',
          icon: <CarryOutOutlined />,
          children: [
            { title: 'leaf', key: '0-0-2-0', icon: <FormOutlined /> },
            {
              title: 'leaf',
              key: '0-0-2-1',
              icon: <CarryOutOutlined />,
            },
          ],
        },
      ],
    },
    {
      title: 'parent 2',
      key: '0-1',
      icon: <CarryOutOutlined />,
      children: [
        {
          title: 'parent 2-0',
          key: '0-1-0',
          icon: <CarryOutOutlined />,
          children: [
            { title: 'leaf', key: '0-1-0-0', icon: <CarryOutOutlined /> },
            { title: 'leaf', key: '0-1-0-1', icon: <CarryOutOutlined /> },
          ],
        },
      ],
    },
  ];
  
const StepOne = () => {
  return (
    <div className="flex w-full">
    {/* Sidebar */}
   
    <div className="w-1/4 bg-gray-100 p-4">
      <h2 className="text-lg font-semibold">Create Voyxa</h2>
      <ul className="mt-4">
        <li className="py-2 text-gray-700">Sales</li>
        <li className="py-2 text-gray-700 font-semibold">Agent Customization</li>
        <li className="py-2 text-gray-700">Agent Knowledge Base</li>
        <li className="py-2 text-gray-700">Flow Configuration</li>
        <li className="py-2 text-gray-700">Voyxa Name</li>
      </ul>
      <Tree
        showLine={true}
        showIcon={true}
        defaultExpandedKeys={['0-0-0']}
        treeData={treeData}
      />
    </div>

    {/* Main Content */}
    <div className="w-3/4 p-6">
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