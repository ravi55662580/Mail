import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD_4OizxYWp9ebAEhe-XdfbpDXTIRhxbIo`, {
        method: 'POST',
        body: JSON.stringify({ email, password, returnSecureToken: true }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to sign up.');
      const data = await response.json();
      dispatch(login({ user: { email: data.email }, token: data.idToken }));
      localStorage.setItem('token', data.idToken);
      localStorage.setItem('email', data.email);
      navigate('/inbox');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
        <h1 className="text-6xl font-bold text-center mb-12 text-blue-900">Mail Box</h1>

    <div className="flex justify-center items-center h-full">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl mb-4">Sign Up</h2>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded p-2" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border rounded p-2" required />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Sign Up</button>
        <div className="mt-4">
          Already have an account? <a href="/login" className="text-blue-500">Login</a>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Signup;