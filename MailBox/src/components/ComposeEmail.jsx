import React, { useState } from 'react';

const ComposeEmail = ({ onSendEmail }) => {
  const [subject, setSubject] = useState('');
  const [recipient, setRecipient] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEmail = {
      id: Date.now(),
      folder: 'sent',
      subject,
      sender: localStorage.getItem('userEmail'),
      recipient,
      date: new Date().toLocaleDateString(),
      body
    };
    onSendEmail(newEmail);
    setSubject('');
    setRecipient('');
    setBody('');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Compose Email</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Send</button>
      </form>
    </div>
  );
};

export default ComposeEmail;
