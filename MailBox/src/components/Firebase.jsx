// src/firebase.js
const SIGNUP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD_4OizxYWp9ebAEhe-XdfbpDXTIRhxbIo`;
const LOGIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD_4OizxYWp9ebAEhe-XdfbpDXTIRhxbIo`;
const DATABASE_URL = "https://mail-box-92607-default-rtdb.firebaseio.com/mails";

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error.message);
  }
  return data;
};

const signup = async (email, password) => {
  const response = await fetch(SIGNUP_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    }),
  });
  return handleResponse(response);
};

const login = async (email, password) => {
  try {
    const response = await fetch(LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    });
    const data = await handleResponse(response);
    console.log('Login response:', data);

    localStorage.setItem('idToken', data.idToken);
    localStorage.setItem('userId', data.localId);

    return data;
  } catch (error) {
    throw new Error('Login failed. Please try again.');
  }
};

// Mail functions
const addMailToDatabase = async (mailData, idToken, userId) => {
    try {
      // Store in sender's sent folder
      const responseSent = await fetch(`${DATABASE_URL}/${userId}/sent.json?auth=${idToken}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mailData),
      });
  
      if (!responseSent.ok) {
        throw new Error('Failed to send mail');
      }
  
      // Store in recipient's inbox folder
      const recipientResponse = await fetch(`${DATABASE_URL}/${mailData.recipient}/inbox.json?auth=${idToken}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mailData),
      });
  
      if (!recipientResponse.ok) {
        throw new Error('Failed to send mail to recipient');
      }
  
      return responseSent.json();
    } catch (error) {
      throw new Error('Failed to send mail');
    }
  };
  const fetchMailsFromDatabase = async (idToken, userId) => {
    try {
      const response = await fetch(`${DATABASE_URL}/${userId}/inbox.json?auth=${idToken}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch mails');
      }
      const data = await response.json();
      const mails = [];
      for (const key in data) {
        mails.push({
          id: key,
          ...data[key],
        });
      }
      return mails;
    } catch (error) {
      throw new Error('Failed to fetch mails');
    }
  };
  

const deleteMailFromDatabase = async (mailId, idToken, userId, mailboxType) => {
  const response = await fetch(`${DATABASE_URL}/${userId}/${mailboxType}/${mailId}.json?auth=${idToken}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete mail');
  }

  return response.json();
};

const updateMailInDatabase = async (mailId, updatedMail, idToken, userId, mailboxType) => {
  const response = await fetch(`${DATABASE_URL}/${userId}/${mailboxType}/${mailId}.json?auth=${idToken}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedMail),
  });

  if (!response.ok) {
    throw new Error('Failed to update mail');
  }

  return response.json();
};

export { signup, login, addMailToDatabase, fetchMailsFromDatabase, deleteMailFromDatabase, updateMailInDatabase };
