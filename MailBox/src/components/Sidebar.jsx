import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const receivedMails = useSelector((state) => state.mail.receivedMails);
  const unreadCount = receivedMails.filter(mail => !mail.read).length;

  return (
    <div className="w-64 bg-gray-200 p-4">
      <ul>
        <li className="mb-4">
          <Link to="/inbox" className="text-lg">Inbox {unreadCount > 0 && <span className="bg-blue-500 text-white rounded-full px-2">{unreadCount}</span>}</Link>
        </li>
        <li className="mb-4">
          <Link to="/sent" className="text-lg">Sent</Link>
        </li>
        <li className="mb-4">
          <Link to="/compose" className="text-lg">Compose</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
