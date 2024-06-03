import React from 'react';

const Sidebar = ({ setCurrentFolder }) => {
  return (
    <div className="w-1/4 bg-gray-200 p-4">
      <ul>
        <li className="mb-2 cursor-pointer" onClick={() => setCurrentFolder('inbox')}>Inbox</li>
        <li className="mb-2 cursor-pointer" onClick={() => setCurrentFolder('sent')}>Sent</li>
        <li className="mb-2 cursor-pointer" onClick={() => setCurrentFolder('drafts')}>Drafts</li>
        <li className="mb-2 cursor-pointer" onClick={() => setCurrentFolder('trash')}>Trash</li>
      </ul>
    </div>
  );
};

export default Sidebar;
