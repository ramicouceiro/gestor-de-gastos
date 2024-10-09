import React, { useState } from 'react';
import { login } from '../utils/services/authService';
import Card from './Cards/Card';
import { useAppStore } from '../utils/store';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const setUser = useAppStore(state => state.setUser);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = await login(username, password);
    if (user) {
      setUser(user);
      navigate('/');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <Card className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] p-4 sm:p-6 md:p-8 lg:p-10">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1 font-semibold text-sm sm:text-base">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 sm:p-3 border rounded-xl focus:outline-none shadow-neomorphicInset text-sm sm:text-base"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1 font-semibold text-sm sm:text-base">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 sm:p-3 border rounded-xl focus:outline-none shadow-neomorphicInset text-sm sm:text-base"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm sm:text-base">{error}</p>}
        <button
          type="submit"
          className="w-full py-2 px-4 shadow-neomorphic rounded-xl hover:shadow-neomorphicInset hover:scale-95 transition-transform duration-150 ease-in-out text-sm sm:text-base"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-center text-sm sm:text-base">
        Don't have an account?{' '}
        <a href="/signup" className="text-primary hover:underline">
          Sign up
        </a>
      </p>
    </Card>
  );
}