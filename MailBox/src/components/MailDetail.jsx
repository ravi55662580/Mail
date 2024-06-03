import React from 'react';
import DOMPurify from 'dompurify';

const MailDetail = ({ mail }) => {
  const { from, to, subject, message } = mail;

  return (
    <div>
      <h3 className="text-xl font-bold">{subject}</h3>
      <p className="text-sm text-gray-500">From: {from}</p>
      <p className="text-sm text-gray-500">To: {to}</p>
      <div
        className="mt-4"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(message) }}
      ></div>
    </div>
  );
};

export default MailDetail;
