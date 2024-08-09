import { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface UpdateModalProps {
  data: Array<{
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
  }>;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
  }) => void;
}

const UpdatePhoneModal: React.FC<UpdateModalProps> = ({ data, isOpen, onClose, onSave }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (data.length > 0) {
      setFirstName(data[0].firstName);
      setLastName(data[0].lastName);
      setPhoneNumber(data[0].phoneNumber);
      setEmail(data[0].email);
    }
  }, [data]);
  const handleSave = () => {
    onSave({ firstName, lastName, phoneNumber, email });
    onClose();
  };

  if (!isOpen) return null;

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-[9999999]"
      onClick={handleClickOutside}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-100">
        <h2 className="text-2xl font-bold mb-4">Update Phone Number</h2>
        <form className="space-y-4">
          <div className="flex">
            <div className="mr-1">
              <label className="block text-sm mb-2 font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="form-input"
                placeholder="Type Name..."
              />
            </div>
            <div className="ml-1">
              <label className="block text-sm mb-2 font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="form-input"
                placeholder="Type Name..."
              />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">
              Phone Number
            </label>
            <PhoneInput
              country={"us"}
              value={phoneNumber}
              onChange={(phone) => setPhoneNumber(phone)}
              disabled={true}
              containerClass="mt-1"
              inputClass="form-input w-full"
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="Type Email..."
            />
          </div>
        </form>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-md border border-gray-300 text-gray-600 px-3.5 py-2.5 text-sm mb-2 hover:border-gray-400 font-semibold shadow-sm mr-3"
          >
            Close
          </button>
          <button
            onClick={handleSave}
            className="rounded-md border border-gray-600 text-white bg-gray-600 px-3.5 py-2.5 text-sm mb-2 hover:border-gray-500 font-semibold shadow-sm hover:bg-gray-500"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePhoneModal;
