"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";

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

// interface DataItem {
//   id: number;
//   number: string;
//   address: string;
//   price: string;
// }

const countryOptions = [
  { value: "US", label: "United States", code: "us" },
  { value: "IE", label: "Ireland", code: "ie" },
  { value: "IT", label: "Italy", code: "it" },
  { value: "DE", label: "Germany", code: "de" },
  // Add more countries as needed
];

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 3;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

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

  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [phonePrice, setPhonePrice] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPhoneNumbers(selectedCountry);
  }, [selectedCountry]);

  const fetchPhoneNumbers = (countryCode: string) => {
    setLoading(true);
    fetch(`/api/getPhoneNumbers?country=${countryCode}`)
      .then(response => response.json())
      .then(data => {
        setPhoneNumbers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching phone numbers:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetch(`/api/getPhonePrice?country=${selectedCountry}`)
      .then(response => response.json())
      .then(data => {
        setPhonePrice(data);
      })
      .catch(error => {
        console.error('Error fetching phone number price:', error);
      });
  }, [selectedCountry]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredPhoneNumbers = phoneNumbers.filter((number: any) =>
    number.phoneNumber.includes(searchQuery)
  );

  const totalPages = Math.ceil(filteredPhoneNumbers.length / itemsPerPage);
  const currentItems = filteredPhoneNumbers.length > 0 ? filteredPhoneNumbers.slice(indexOfFirstItem, indexOfLastItem) : []


  const handleRowClick = (id: string) => {
    if (selectedRowId == id || id == null) {
      setSelectedRowId(null);
    }
    else {
      setSelectedRowId(id);
    }
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

  const handleCountryChange = (selectedOption: any) => {
    setSelectedCountry(selectedOption.value);
  };

  const handleContinue = () => {
    if (selectedRowId) {
      const purchaseUrl = `https://www.twilio.com/console/phone-numbers/search?SelectedNumber=${selectedRowId}`;
      window.location.href = purchaseUrl;
    }
  };

  const handlePurchase = async (phoneNumber: string) => {
    const confirmPurchase = window.confirm(`Are you sure you want to purchase the phone number ${phoneNumber}?`);
    if (confirmPurchase) {
      try {
        const response = await fetch('/api/purchasePhoneNumber', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ phoneNumber, country: selectedCountry }),
        });

        if (response.ok) {
          const data = await response.json();
          alert(`Phone number ${data.phoneNumber} purchased successfully!`);
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.error}`);
        }
      } catch (error) {
        console.error('Error purchasing phone number:', error);
        alert('An error occurred while purchasing the phone number.');
      }
    }
  };

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
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search phone numbers..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
          </div>

          <Select
            options={countryOptions}
            components={{ Option: CustomOption, SingleValue }}
            styles={customStyles}
            defaultValue={countryOptions.find(option => option.value === selectedCountry)}
            onChange={handleCountryChange}
          />

        </div>

        {loading ? (
          //   <div className="flex justify-center items-center mt-6">
          //     <div className="loader">Loading...</div>
          // </div>
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
                      className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 w-[20%]"
                    > PRICE </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 w-[20%]"
                    > &nbsp; </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white-100 divide-[#243c5a00] bg-white">
                  <tr
                    className={`  "bg-white-100" : ""}`}>
                    <td colSpan={4} className="whitespace-nowrap px-3 py-6 text-sm text-gray-500 text-right">
                      &nbsp;
                    </td>
                  </tr>
                  <tr
                    className={`  "bg-white-100" : ""}`}>
                    <td colSpan={4} className="whitespace-nowrap px-3 py-6 text-sm text-gray-500 text-center">
                      Please Wait . . .
                    </td>
                  </tr>
                  <tr
                    className={`  "bg-white-100" : ""}`}>
                    <td colSpan={4} className="whitespace-nowrap px-3 py-6 text-sm text-gray-500 text-right">
                      &nbsp;
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex justify-between items-center mt-4">
              <button
                disabled={currentPage === 1}
                className={`h-[40px] px-[10px] justify-between ml-2 w-[70px] inline-flex items-center rounded-md border text-gray-600 text-sm mb-2 font-semibold shadow-sm ${currentPage === 1
                  ? 'border-gray-300 text-gray-300 cursor-not-allowed'
                  : 'border-gray-300 hover:border-gray-400'
                  }`}
              >
                <ArrowLeftIcon className="h-3 w-3" aria-hidden="true" />
                Prev
              </button>

              <span>
                Page 0 of 0
              </span>

              <button
                disabled={currentPage === Math.ceil(filteredPhoneNumbers.length / itemsPerPage)}
                className={`h-[40px] px-[10px] justify-between ml-2 w-[70px] inline-flex items-center rounded-md border text-gray-600 text-sm mb-2 font-semibold shadow-sm ${currentPage === Math.ceil(filteredPhoneNumbers.length / itemsPerPage)
                  ? 'border-gray-300 text-gray-300 cursor-not-allowed'
                  : 'border-gray-300 hover:border-gray-400'
                  }`}
              >
                Next
                <ArrowRightIcon className="h-3 w-3" aria-hidden="true" />
              </button>
            </div>

          </div>
        ) : (
          (currentItems.length == 0) ?
            (
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
                          className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 w-[20%]"
                        > PRICE </th>

                        <th
                          scope="col"
                          className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 w-[20%]"
                        > &nbsp; </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white-100 divide-[#243c5a00] bg-white">
                      <tr
                        className={`  "bg-white-100" : ""}`}>
                        <td colSpan={4} className="whitespace-nowrap px-3 py-6 text-sm text-gray-500 text-right">
                          &nbsp;
                        </td>
                      </tr>
                      <tr
                        className={`  "bg-white-100" : ""}`}>
                        <td colSpan={4} className="whitespace-nowrap px-3 py-6 text-sm text-gray-500 text-center">
                          Not Found Phone Number !
                        </td>
                      </tr>
                      <tr
                        className={`  "bg-white-100" : ""}`}>
                        <td colSpan={4} className="whitespace-nowrap px-3 py-6 text-sm text-gray-500 text-right">
                          &nbsp;
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <button
                    disabled={currentPage === 1}
                    className={`h-[40px] px-[10px] justify-between ml-2 w-[70px] inline-flex items-center rounded-md border text-gray-600 text-sm mb-2 font-semibold shadow-sm ${currentPage === 1
                      ? 'border-gray-300 text-gray-300 cursor-not-allowed'
                      : 'border-gray-300 hover:border-gray-400'
                      }`}
                  >
                    <ArrowLeftIcon className="h-3 w-3" aria-hidden="true" />
                    Prev
                  </button>

                  <span>
                    Page 0 of 0
                  </span>

                  <button
                    disabled={currentPage === Math.ceil(filteredPhoneNumbers.length / itemsPerPage)}
                    className={`h-[40px] px-[10px] justify-between ml-2 w-[70px] inline-flex items-center rounded-md border text-gray-600 text-sm mb-2 font-semibold shadow-sm ${currentPage === Math.ceil(filteredPhoneNumbers.length / itemsPerPage)
                      ? 'border-gray-300 text-gray-300 cursor-not-allowed'
                      : 'border-gray-300 hover:border-gray-400'
                      }`}
                  >
                    Next
                    <ArrowRightIcon className="h-3 w-3" aria-hidden="true" />
                  </button>
                </div>

              </div>
            )

            : (<div className="container mx-auto mt-1">
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
                        className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 w-[20%]"
                      > PRICE </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 w-[20%]"
                      > &nbsp; </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {currentItems.map((number, index) => (
                      <tr
                        key={index}
                        className={`cursor-pointer ${selectedRowId === number.phoneNumber ? "bg-gray-100" : ""
                          }`}
                        onClick={() => handleRowClick(number.phoneNumber)}
                      >
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {number.phoneNumber}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {number.locality}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-right">
                          {phonePrice.priceUnit} {phonePrice.price}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-right">
                          <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            onClick={() => handlePurchase(number.phoneNumber)}
                          >
                            Purchase
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`h-[40px] px-[10px] justify-between ml-2 w-[70px] inline-flex items-center rounded-md border text-gray-600 text-sm mb-2 font-semibold shadow-sm ${currentPage === Math.ceil(filteredPhoneNumbers.length / itemsPerPage)
                    ? 'border-gray-300 text-gray-300 cursor-not-allowed'
                    : 'border-gray-300 hover:border-gray-400'
                    }`}
                >
                  <ArrowLeftIcon className="h-3 w-3" aria-hidden="true" />
                  Prev
                </button>

                <span>
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`h-[40px] px-[10px] justify-between ml-2 w-[70px] inline-flex items-center rounded-md border text-gray-600 text-sm mb-2 font-semibold shadow-sm ${currentPage === Math.ceil(filteredPhoneNumbers.length / itemsPerPage)
                    ? 'border-gray-300 text-gray-300 cursor-not-allowed'
                    : 'border-gray-300 hover:border-gray-400'
                    }`}
                >
                  Next
                  <ArrowRightIcon className="h-3 w-3" aria-hidden="true" />
                </button>
              </div>

            </div>)
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-md border border-gray-300 text-gray-600 px-3.5 py-2.5 text-sm mb-2 hover:border-gray-400 font-semibold shadow-sm mr-3"
          >
            Cancel
          </button>

          {selectedRowId ? (
            <button className="rounded-md border border-gray-600 text-white bg-gray-600 px-3.5 py-2.5 text-sm mb-2 hover:border-gray-500 font-semibold shadow-sm hover:bg-gray-500" onClick={handleContinue}>
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
        </div>
      </div>
    </div>
  );
};

export default Modal;
