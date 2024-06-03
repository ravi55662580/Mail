import React, { useState, useEffect } from 'react';
import { fetchMailsFromDatabase } from './Firebase';
import Mailbox from './Mailbox'; // Import the Mailbox component

const Inbox = () => {
  const [mails, setMails] = useState([]);
  const [error, setError] = useState('');
  const [isMailbox, setIsMailbox] = useState(false); // State to control Mailbox visibility

  useEffect(() => {
    const idToken = localStorage.getItem('idToken');
    const userId = localStorage.getItem('userEmail');

    const fetchMails = async () => {
      try {
        const fetchedMails = await fetchMailsFromDatabase(idToken, userEmail);
        setMails(fetchedMails);
        setError('');
      } catch (error) {
        setError('Failed to fetch mails');
      }
    };

    fetchMails();
  }, []);

  // Function to handle compose button click
  const handleComposeClick = () => {
    setIsMailbox(true); // Set isMailbox to true to open Mailbox
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {/* Conditional rendering of Mailbox */}
      {isMailbox ? (
        <Mailbox setIsMailbox={setIsMailbox} /> // Pass setIsMailbox as prop to Mailbox component
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Inbox</h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="mb-4">
            {mails.map((mail) => (
              <div key={mail.id} className="border-b border-gray-200 mb-4 pb-4">
                <p className="font-bold">From: {mail.sender}</p>
                <p className="text-gray-700 mb-2">Subject: {mail.subject}</p>
                <p>{mail.body}</p>
              </div>
            ))}
          </div>
          <button
            onClick={handleComposeClick} // Attach handleComposeClick to onClick event of the button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Compose
          </button>
        </div>
      )}
    </div>
  );
};

export default Inbox;
