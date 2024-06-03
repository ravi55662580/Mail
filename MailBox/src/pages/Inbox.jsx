import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useEmails from '../hooks/useEmails';
import MailModal from '../components/MailModal';
import { setReceivedMails } from '../redux/slices/mailSlice';

const Inbox = () => {
  const dispatch = useDispatch();
  const { getReceivedMails, markAsRead, deleteMail } = useEmails();
  const receivedMails = useSelector((state) => state.mail.receivedMails);
  const [selectedMail, setSelectedMail] = useState(null);

  useEffect(() => {
    getReceivedMails();
  }, [getReceivedMails]);

  const handleSelectMail = (mail) => {
    setSelectedMail(mail);
    if (!mail.read) {
      markAsRead(mail.id).then(() => {
        dispatch(
          setReceivedMails(
            receivedMails.map((m) => (m.id === mail.id ? { ...m, read: true } : m))
          )
        );
      });
    }
  };

  const handleDeleteMail = (mailId) => {
    deleteMail(mailId).then(() => {
      setSelectedMail(null);  // Deselect the mail if it's being deleted
    });
  };

  const unreadCount = receivedMails.filter(mail => !mail.read).length;

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Inbox</h2>
      <div className="grid grid-cols-1 gap-4">
        <ul>
          {receivedMails.map((mail) => (
            <li
              key={mail.id}
              onClick={() => handleSelectMail(mail)}
              className={`p-2 border-b cursor-pointer ${!mail.read ? 'bg-blue-100' : ''}`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{mail.subject}</h3>
                  <p className="text-sm text-gray-600">{mail.from}</p>
                </div>
                <span className="text-sm text-gray-600">{new Date(mail.timestamp).toLocaleString()}</span>
                {!mail.read && <span className="w-3 h-3 bg-blue-500 rounded-full"></span>}
              </div>
            </li>
          ))}
        </ul>
      </div>
      {selectedMail && (
        <MailModal
          mail={selectedMail}
          onClose={() => setSelectedMail(null)}
          onDelete={handleDeleteMail}
        />
      )}
    </div>
  );
};

export default Inbox;
