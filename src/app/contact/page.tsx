"use client";

import { useState } from "react";
import Modal from "../component/modal";
import Table from "../component/table";
import { PlusIcon } from "@heroicons/react/20/solid";
import { CloudArrowUpIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";

const Contact = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<
    Array<{
      firstName: string;
      lastName: string;
      phoneNumber: string;
      email: string;
    }>
  >([]);

  const handleSave = (newData: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
  }) => {
    setData([...data, newData]);
  };

  const handleDelete = (index: number) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  return (
    <div
      className={classNames(
        data.length != 0 ? " items-start pt-[110px]" : "items-center",
        "container mx-auto h-full flex justify-center"
      )}
    >
      {data.length == 0 ? (
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
            No contacts
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new contact.
          </p>
          <div className="mt-6">
            <button
              onClick={() => setIsModalOpen(true)}
              type="button"
              className="justify-center ml-2 w-[90px] inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
              Add
            </button>
            <button
              type="button"
              className="justify-center ml-2 w-[90px] inline-flex items-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <CloudArrowUpIcon
                className="-ml-0.5 mr-1.5 h-5 w-5"
                aria-hidden="true"
              />
              Import
            </button>
          </div>
        </div>
      ) : (
        <div className="w-[90%]">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Contacts</h1>
            <div>
              <button
                onClick={() => setIsModalOpen(true)}
                type="button"
                className="justify-center ml-2 w-[90px] inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <PlusIcon
                  className="-ml-0.5 mr-1.5 h-5 w-5"
                  aria-hidden="true"
                />
                Add
              </button>
              <button
                type="button"
                className="justify-center ml-2 w-[90px] inline-flex items-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <CloudArrowUpIcon
                  className="-ml-0.5 mr-1.5 h-5 w-5"
                  aria-hidden="true"
                />
                Import
              </button>
            </div>
          </div>
          <Table data={data} onDelete={handleDelete} />
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
};

export default Contact;
