import React from 'react';

const MailItem = ({ email, onSelectEmail }) => {
  return (
    <div className="border-b last:border-0 cursor-pointer" onClick={() => onSelectEmail(email)}>
      <div className="p-4 flex flex-col">
        <span className="font-semibold">{email.subject}</span>
        <span className="text-gray-500">{email.sender}</span>
        <span className="text-sm text-gray-400">{email.date}</span>
      </div>
    </div>
  );
};

export default MailItem;
