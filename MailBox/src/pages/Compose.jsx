import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useEmails from '../hooks/useEmails';

const Compose = () => {
  const { sendMail } = useEmails();
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMail({ to, subject, message, timestamp: new Date().toISOString(), read: false });
    setTo('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Compose Mail</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">To</label>
          <input type="email" value={to} onChange={(e) => setTo(e.target.value)} className="w-full border rounded p-2" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Subject</label>
          <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full border rounded p-2" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Message</label>
          <ReactQuill value={message} onChange={setMessage} />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Send</button>
      </form>
    </div>
  );
};

export default Compose;
