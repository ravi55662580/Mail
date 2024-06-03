const SIGNUP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD_4OizxYWp9ebAEhe-XdfbpDXTIRhxbIo`;
const LOGIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD_4OizxYWp9ebAEhe-XdfbpDXTIRhxbIo`;
const DATABASE_URL = "https://mail-box-92607-default-rtdb.firebaseio.com";

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error.message);
  }
  return data;
};

export const signup = async (email, password) => {
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

export const login = async (email, password) => {
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

    localStorage.setItem('idToken', data.idToken);
    localStorage.setItem('userId', data.localId);
    localStorage.setItem('userEmail', email);

    return data;
  } catch (error) {
    throw new Error('Login failed. Please try again.');
  }
};

export const fetchEmails = async (userId) => {
  const response = await fetch(`${DATABASE_URL}/emails/${userId}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await handleResponse(response);
  return data ? Object.values(data) : [];
};

export const sendEmail = async (email, userId) => {
  const response = await fetch(`${DATABASE_URL}/emails/${userId}.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(email),
  });
  return handleResponse(response);
};
