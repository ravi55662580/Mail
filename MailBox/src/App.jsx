import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Inbox from './pages/Inbox';
import Sent from './pages/Sent';
import Compose from './pages/Compose';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="flex h-screen">
      {isAuthenticated && <Sidebar />}
      <div className="flex-1 flex flex-col">
        {isAuthenticated && <Navbar />}
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/inbox" element={<PrivateRoute><Inbox /></PrivateRoute>} />
            <Route path="/sent" element={<PrivateRoute><Sent /></PrivateRoute>} />
            <Route path="/compose" element={<PrivateRoute><Compose /></PrivateRoute>} />
            <Route path="*" element={<Navigate to="/signup" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
