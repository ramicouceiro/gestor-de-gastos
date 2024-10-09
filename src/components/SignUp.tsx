import React, { useState } from 'react';
import { signUp } from '../utils/services/authService';
import Card from './Cards/Card';
import { useAppStore } from '../utils/store';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [error, setError] = useState('');
  const setUser = useAppStore(state => state.setUser);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const user = await signUp(username, password, email, name, surname);
      if (user) {
        setUser(user);
        navigate('/');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <Card className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] p-4 sm:p-6 md:p-8 lg:p-10">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1 font-semibold text-sm sm:text-base">Username</label>
          <input
            type="text"
            id="username"
            placeholder='Use a fake username'
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
            placeholder='Use a fake password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 sm:p-3 border rounded-xl focus:outline-none shadow-neomorphicInset text-sm sm:text-base"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1 font-semibold text-sm sm:text-base">Email</label>
          <input
            type="email"
            id="email"
            placeholder='Use a fake email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 sm:p-3 border rounded-xl focus:outline-none shadow-neomorphicInset text-sm sm:text-base"
            required
          />
        </div>
        <div>
          <label htmlFor="name" className="block mb-1 font-semibold text-sm sm:text-base">Name</label>
          <input
            type="text"
            id="name"
            placeholder='Use a fake name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 sm:p-3 border rounded-xl focus:outline-none shadow-neomorphicInset text-sm sm:text-base"
            required
          />
        </div>
        <div>
          <label htmlFor="surname" className="block mb-1 font-semibold text-sm sm:text-base">Surname</label>
          <input
            type="text"
            id="surname"
            placeholder='Use a fake surname'
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            className="w-full p-2 sm:p-3 border rounded-xl focus:outline-none shadow-neomorphicInset text-sm sm:text-base"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm sm:text-base">{error}</p>}
        <button
          type="submit"
          className="w-full py-2 px-4 shadow-neomorphic rounded-xl hover:shadow-neomorphicInset hover:scale-95 transition-transform duration-150 ease-in-out text-sm sm:text-base"
        >
          Sign Up
        </button>
      </form>
    </Card>
  );
}