"use client";

import { useState } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import Select, { components } from "react-select";
import WorldFlag from "react-world-flags";
import "react-phone-input-2/lib/style.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
  }) => void;
}

interface DataItem {
  id: number;
  number: string;
  address: string;
  price: string;
}

const countryOptions = [
  { value: "US", label: "United States", code: "us" },
  { value: "DE", label: "Germany", code: "de" },
  // Add more countries as needed
];

const data: DataItem[] = [
  { id: 1, number: "123-456-7890", address: "123 Main St", price: "$100" },
  { id: 2, number: "987-654-3210", address: "456 Elm St", price: "$200" },
  { id: 3, number: "555-555-5555", address: "789 Oak St", price: "$150" },
  { id: 4, number: "123-456-7890", address: "123 Main St", price: "$100" },
  { id: 5, number: "987-654-3210", address: "456 Elm St", price: "$200" },
  { id: 6, number: "555-555-5555", address: "789 Oak St", price: "$150" },
  { id: 7, number: "123-456-7890", address: "123 Main St", price: "$100" },
  { id: 8, number: "987-654-3210", address: "456 Elm St", price: "$200" },
  { id: 9, number: "555-555-5555", address: "789 Oak St", price: "$150" },
  { id: 10, number: "123-456-7890", address: "123 Main St", price: "$100" },
  { id: 11, number: "987-654-3210", address: "456 Elm St", price: "$200" },
  { id: 12, number: "555-555-5555", address: "789 Oak St", price: "$150" },
];

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      display: "flex",
      border: "1px solid #ddd",
      borderRadius: "5px",
      width: "300px",
      height: "42px",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
    }),
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleRowClick = (id: number) => {
    setSelectedRowId(id);
  };

  if (!isOpen) return null;

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const CustomOption = (props: any) => (
    <components.Option {...props}>
      <div className="flex items-center">
        <WorldFlag code={props.data.code} className="w-6 h-4 mr-2" />
        {props.data.label}
      </div>
    </components.Option>
  );

  const SingleValue = (props: any) => (
    <components.SingleValue {...props}>
      <div className="flex items-center">
        <WorldFlag code={props.data.code} className="w-6 h-4 mr-2" />
        {props.data.label}
      </div>
    </components.SingleValue>
  );

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-[9999999]"
      onClick={handleClickOutside}
    >
      <div className="w-[700px] bg-white p-6 rounded-lg shadow-lg w-100">
        <h2 className="text-2xl font-bold mb-4">Choose a phone number</h2>

        <div className="flex justify-between mt-6">
          {/* Search Input */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search phone numbers..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
          </div>

          <Select
            options={countryOptions}
            components={{ Option: CustomOption, SingleValue }}
            styles={customStyles}
          />
        </div>
        <div className="container mx-auto mt-1">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="divide-y divide-gray-300 w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 w-[40%]"
                  >
                    PHONE NUMBER
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-[40%]"
                  >
                    ADDRESS RECUIREMENTS
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-[20%]"
                  ></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {currentItems.map((item, index) => (
                  <tr
                    key={index}
                    className={`cursor-pointer ${
                      selectedRowId === item.id ? "bg-gray-100" : ""
                    }`}
                    onClick={() => handleRowClick(item.id)}
                  >
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {item.number}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {item.address}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-right">
                      {item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end mt-4">
            {currentPage > 1 && (
              <button
                onClick={prevPage}
                className="h-[40px] px-[10px] justify-between ml-2 w-[70px] inline-flex items-center rounded-md border border-gray-300 text-gray-600 text-sm mb-2 hover:border-gray-400 font-semibold shadow-sm"
              >
                <ArrowLeftIcon className="h-3 w-3" aria-hidden="true" />
                Prev
              </button>
            )}
            {currentPage < Math.ceil(data.length / itemsPerPage) && (
              <button
                onClick={nextPage}
                className="h-[40px] px-[10px] justify-between ml-2 w-[70px] inline-flex items-center rounded-md border border-gray-300 text-gray-600 text-sm mb-2 hover:border-gray-400 font-semibold shadow-sm ml-3"
              >
                Next
                <ArrowRightIcon className="h-3 w-3" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-md border border-gray-300 text-gray-600 px-3.5 py-2.5 text-sm mb-2 hover:border-gray-400 font-semibold shadow-sm mr-3"
          >
            Cancel
          </button>
          <Link href="/calling/numberpay">
            {selectedRowId ? (
              <button className="rounded-md border border-gray-600 text-white bg-gray-600 px-3.5 py-2.5 text-sm mb-2 hover:border-gray-500 font-semibold shadow-sm hover:bg-gray-500">
                Continue
              </button>
            ) : (
              <button
                disabled
                className="rounded-md border border-gray-300 text-white bg-gray-300 px-3.5 py-2.5 text-sm mb-2 font-semibold shadow-sm"
              >
                Continue
              </button>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Modal;
