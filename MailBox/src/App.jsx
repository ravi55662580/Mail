// src/App.js
import React, { useState } from 'react';
import Signup from './components/SignUp';
import Login from './components/Login';
import Welcome from './components/Welcome';
import Mailbox from './components/MailBox';
import Inbox from './components/Inbox'; // Import the Inbox component

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignup, setIsSignup] = useState(true);
  const [isMailbox, setIsMailbox] = useState(false);
  const [isInbox, setIsInbox] = useState(false); // Add state for Inbox

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setIsInbox(true); // Set Inbox as default view after login
  };

  return (
    <div className="App">
      {!isAuthenticated ? (
        isSignup ? (
          <Signup />
        ) : (
          <Login onLoginSuccess={handleLoginSuccess} />
        )
      ) : isInbox ? ( // Render Inbox component if isInbox is true
        <Inbox />
      ) : isMailbox ? (
        <Mailbox />
      ) : (
        <Welcome />
      )}
      <div className="text-center mt-4">
        <button
          onClick={() => setIsSignup(!isSignup)}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {isSignup ? 'Already have an account? Login' : 'New user? Sign Up'}
        </button>
      </div>
    </div>
  );
}

export default App;
