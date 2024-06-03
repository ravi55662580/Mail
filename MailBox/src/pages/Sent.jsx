import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useEmails from '../hooks/useEmails';
import MailModal from '../components/MailModal';
import { setSentMails } from '../redux/slices/mailSlice';

const Sent = () => {
  const dispatch = useDispatch();
  const { getSentMails, deleteMail } = useEmails();
  const sentMails = useSelector((state) => state.mail.sentMails);
  const [selectedMail, setSelectedMail] = useState(null);

  useEffect(() => {
    getSentMails();
  }, [getSentMails]);

  const handleSelectMail = (mail) => {
    setSelectedMail(mail);
  };

  const handleDeleteMail = (mailId) => {
    deleteMail(mailId).then(() => {
      setSelectedMail(null);  // Deselect the mail if it's being deleted
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Sent Mails</h2>
      <div className="grid grid-cols-1 gap-4">
        <ul>
          {sentMails.map((mail) => (
            <li
              key={mail.id}
              onClick={() => handleSelectMail(mail)}
              className="p-2 border-b cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{mail.subject}</h3>
                  <p className="text-sm text-gray-600">To: {mail.to}</p>
                </div>
                <span className="text-sm text-gray-600">{new Date(mail.timestamp).toLocaleString()}</span>
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

export default Sent;
