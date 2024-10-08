import React, { useState } from 'react';
import { signUp } from '../utils/services/authService';
import Card from './Cards/Card';

interface SignUpProps {
  onSignUp: (user: { id: number; username: string }) => void;
}

export default function SignUp({ onSignUp }: SignUpProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const user = await signUp(username, password, email, name, surname);
      if (user) {
        onSignUp(user);
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
    <Card className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] p-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1 font-semibold">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border rounded-xl focus:outline-none shadow-neomorphicInset"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1 font-semibold">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-xl focus:outline-none shadow-neomorphicInset"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-xl focus:outline-none shadow-neomorphicInset"
            required
          />
        </div>
        <div>
          <label htmlFor="name" className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-xl focus:outline-none shadow-neomorphicInset"
            required
          />
        </div>
        <div>
          <label htmlFor="surname" className="block mb-1 font-semibold">Surname</label>
          <input
            type="text"
            id="surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            className="w-full p-3 border rounded-xl focus:outline-none shadow-neomorphicInset"
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full py-2 px-4 shadow-neomorphic rounded-xl hover:shadow-neomorphicInset hover:scale-95 transition-transform duration-150 ease-in-out"
        >
          Sign Up
        </button>
      </form>
    </Card>
  );
}