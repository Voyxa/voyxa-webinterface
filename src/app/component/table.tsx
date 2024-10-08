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
import { TrashIcon,PencilSquareIcon } from "@heroicons/react/20/solid";

const Table: React.FC<TableProps> = ({ data, onDelete,onUpdate }) => {
  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
    <table className="min-w-full bg-white shadow-lg">
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
                onClick={() => onUpdate(index)}
                className="-ml-0.5 mr-1.5 h-5 w-5 text-blue-400 hover:text-blue-500 hover:cursor-pointer"
                aria-hidden="true"
              /></button>
               <button><TrashIcon
                onClick={() => onDelete(index)}
                className="-ml-0.5 mr-1.5 h-5 w-5 text-red-400 hover:text-red-500 hover:cursor-pointer"
                aria-hidden="true"
              /></button>
              
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default Table;
