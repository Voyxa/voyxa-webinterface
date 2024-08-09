import { useState } from "react";
import { TrashIcon,PencilIcon,PencilSquareIcon } from "@heroicons/react/20/solid";
import UpdatePhoneModal from "../component/updatePhoneModal";

interface TableProps {
    data: Array<{
      firstName: string;
      lastName: string;
      phoneNumber: string;
      email: string;
    }>;
    onDelete: (index: number) => void;
    onUpdate: (index: number) => void;
  }
  
  const PhoneTable: React.FC<TableProps> = ({ data, onDelete,onUpdate }) => {
  const [isUpdatePhoneModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState<
    Array<{
        firstName: string;
        lastName: string;
        phoneNumber: string;
        email: string;
    }>
    >([]);

  const onCurrentData = (index: number) => {
    console.log(data);
    const newData = data.filter((_, i) => i == index);
    console.log(newData);
    setCurrentData(newData);
  };
  const [phoneData, setData] = useState<
    Array<{
      firstName: string;
      lastName: string;
      phoneNumber: string;
      email: string;
    }>
  >([]);

  const handleUpdate = (newData: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
  }) => {
    setData([...phoneData, newData]);
  };

    return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        <table className="divide-y divide-gray-300 min-w-full bg-white shadow-lg  rounded-lg">
        <thead className="bg-gray-200 text-gray-700">
          <tr className="h-[47px]">
            <th className="py-2 px-4 border-b border-gray-300">First Name</th>
            <th className="py-2 px-4 border-b border-gray-300">Last Name</th>
            <th className="py-2 px-4 border-b border-gray-300">Phone Number</th>
            <th className="py-2 px-4 border-b border-gray-300">Email</th>
            <th className="py-2 px-4 border-b border-gray-300"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="h-[47px]">
              <td className="py-2 px-4 border-t border-gray-300 text-center">
                {item.firstName}
              </td>
              <td className="py-2 px-4 border-t border-gray-300 text-center">
                {item.lastName}
              </td>
              <td className="py-2 px-4 border-t border-gray-300 text-center">
                {item.phoneNumber}
              </td>
              <td className="py-2 px-4 border-t border-gray-300 text-center">
                {item.email}
              </td>
              <td className="py-2 px-4 border-t border-gray-300 text-center">
              <button><PencilSquareIcon              
              onClick={() => {onCurrentData(index);setIsUpdateModalOpen(true)}}

                className="-ml-0.5 mr-3.5 h-5 w-5 text-blue-400 hover:text-blue-500 hover:cursor-pointer"
                aria-hidden="true"
              /></button>
               <button><TrashIcon
                onClick={() => onDelete(index)}
                className="-ml-1.5 mr-0.5 h-5 w-5 text-red-400 hover:text-red-500 hover:cursor-pointer"
                aria-hidden="true"
              /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <UpdatePhoneModal
        data={currentData}
        isOpen={isUpdatePhoneModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onSave={handleUpdate}
      />
    </div>
    );
  };
  
  export default PhoneTable;
  