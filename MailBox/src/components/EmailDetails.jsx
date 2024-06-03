import React from 'react';

const EmailDetails = ({ email, onClose }) => {
  if (!email) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-1/2">
        <button className="mb-4" onClick={onClose}>Close</button>
        <h2 className="text-xl font-bold mb-2">{email.subject}</h2>
        <p className="text-sm text-gray-500">{email.sender} - {email.date}</p>
        <div className="mt-4">{email.body}</div>
      </div>
    </div>
  );
};

export default EmailDetails;
