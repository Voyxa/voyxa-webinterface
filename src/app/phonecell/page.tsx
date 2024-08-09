"use client";

import { useState } from "react";
import PhoneModal from "../component/phonemodal";
import PhoneTable from "../component/phoneTable";
import { CloudArrowUpIcon,PhoneIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";

const Phonecell = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const initialPhoneData = [
    {
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "123-456-7890",
      email: "john.doe@example.com",
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      phoneNumber: "987-654-3210",
      email: "jane.smith@example.com",
    },
    {
      firstName: "Alice",
      lastName: "Johnson",
      phoneNumber: "555-123-4567",
      email: "alice.johnson@example.com",
    },
  ];

  const [phoneData, setData] = useState(initialPhoneData);
  // const [phoneData, setData] = useState<
  //   Array<{
  //     firstName: string;
  //     lastName: string;
  //     phoneNumber: string;
  //     email: string;
  //   }>
  // >([]);

  const handleSave = (newData: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
  }) => {
    setData([...phoneData, newData]);
  };
  
  const handleDelete = (index: number) => {
    const newData = phoneData.filter((_, i) => i !== index);
    setData(newData);
  };
  const handleUpdate = (index: number) => {
    const newData = phoneData.filter((_, i) => i !== index);
    setData(newData);
  };

  return (
    <div
      className={classNames(
        phoneData.length != 0 ? " items-start pt-[110px]" : "items-center",
        "container mx-auto h-full flex justify-center"
      )}
    >
      {phoneData.length == 0 ? (
      <div className="text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-semibold text-gray-900">
        
          Phone numbers
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Welcome to your phone numbers management page. Your numbers will
          appear here.
        </p>
        <div className="mt-6">
          <button
            onClick={() => setIsModalOpen(true)}
            type="button"
            className="justify-center ml-2 w-[170px] inline-flex items-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <CloudArrowUpIcon
              className="-ml-0.5 mr-1.5 h-5 w-5"
              aria-hidden="true"
            />
            Buy a number
          </button>
        </div>
      </div>
      ) : (
          <div className="w-[90%]">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Phone Numbers</h1>
            <div>
            <button
            onClick={() => setIsModalOpen(true)}
            type="button"
            className="justify-center ml-2 w-[170px] inline-flex items-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <CloudArrowUpIcon
              className="-ml-0.5 mr-1.5 h-5 w-5"
              aria-hidden="true"
            />
            Buy a number
          </button>
            </div>
          </div>
          <PhoneTable data={phoneData} onDelete={handleDelete} onUpdate={handleUpdate} />
        </div>
      )}
      <PhoneModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
      
    </div>
  );
};

export default Phonecell;



