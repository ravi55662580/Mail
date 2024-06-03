import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  };

  return (
    <div className="bg-gray-800 text-gray-100 p-4 flex justify-between">
      <div className="text-5xl">Mailbox</div>
      <div className="flex items-center space-x-4">
        <span>{user?.email}</span>
        <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
