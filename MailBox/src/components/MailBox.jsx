import React from 'react';
import MailItem from './MailItem';

const Mailbox = ({ emails, onSelectEmail }) => {
  return (
    <div className="p-4 w-3/4">
      <h1 className="text-2xl font-bold mb-4">Mailbox</h1>
      <div className="bg-white shadow-md rounded-lg">
        {emails.map((email) => (
          <MailItem key={email.id} email={email} onSelectEmail={onSelectEmail} />
        ))}
      </div>
    </div>
  );
};

export default Mailbox;
