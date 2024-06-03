import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setReceivedMails, setSentMails, addReceivedMail, addSentMail } from '../redux/slices/mailSlice';
import DOMPurify from 'dompurify';

const useEmails = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const email = localStorage.getItem('email').replace(/[@.""]/g, "");

  const getReceivedMails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://mail-box-92607-default-rtdb.firebaseio.com/emails/${email}/received.json`);
      if (!response.ok) throw new Error('Failed to fetch received mails.');
      const data = await response.json();
      const mails = Object.keys(data || {}).map(key => ({ id: key, ...data[key] }));
      dispatch(setReceivedMails(mails));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getSentMails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://mail-box-92607-default-rtdb.firebaseio.com/emails/${email}/sent.json`);
      if (!response.ok) throw new Error('Failed to fetch sent mails.');
      const data = await response.json();
      const mails = Object.keys(data || {}).map(key => ({ id: key, ...data[key] }));
      dispatch(setSentMails(mails));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const sendMail = async (mailData) => {
    setLoading(true);
    try {
      const response = await fetch(`https://mail-box-92607-default-rtdb.firebaseio.com/emails/${email}/sent.json`, {
        method: 'POST',
        body: JSON.stringify(mailData),
      });
      if (!response.ok) throw new Error('Failed to send mail.');
      const data = await response.json();
      dispatch(addSentMail({ id: data.name, ...mailData }));

      const receiverEmail = mailData.to.replace(/[@.""]/g, "");
      const receiverResponse = await fetch(`https://mail-box-92607-default-rtdb.firebaseio.com/emails/${receiverEmail}/received.json`, {
        method: 'POST',
        body: JSON.stringify({ ...mailData, from: email, read: false }),
      });
      if (!receiverResponse.ok) throw new Error('Failed to receive mail!');
      const receiverData = await receiverResponse.json();
      dispatch(addReceivedMail({ id: receiverData.name, ...mailData, from: email, read: false }));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (emailId) => {
    const receiverEmail = localStorage.getItem('email').replace(/[@.""]/g, "");
    try {
      await fetch(`https://mail-box-92607-default-rtdb.firebaseio.com/emails/${receiverEmail}/received/${emailId}.json`, {
        method: 'PATCH',
        body: JSON.stringify({ read: true }),
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteMail = async (emailId) => {
    const receiverEmail = localStorage.getItem('email').replace(/[@.""]/g, "");
    try {
      await fetch(`https://mail-box-92607-default-rtdb.firebaseio.com/emails/${receiverEmail}/received/${emailId}.json`, {
        method: 'DELETE',
      });
      getReceivedMails();  // Refresh the list after deletion
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getReceivedMails();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return { getReceivedMails, getSentMails, sendMail, markAsRead, deleteMail, loading, error, sanitizeHtml: DOMPurify.sanitize };
};

export default useEmails;
