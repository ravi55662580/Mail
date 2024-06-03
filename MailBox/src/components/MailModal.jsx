import React from 'react';
import MailDetail from './MailDetail';

const MailModal = ({ mail, onClose, onDelete }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>
        <MailDetail mail={mail} />
        <button
          onClick={() => onDelete(mail.id)}
          className="mt-4 p-2 bg-red-500 text-white w-full"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MailModal;
