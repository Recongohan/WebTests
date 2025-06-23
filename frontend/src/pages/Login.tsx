import { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'wouter';

export default function Login() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', { email, password, token });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      navigate('/dashboard');
    } catch (err) {
      setError('Login failed');
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="bg-white p-6 rounded shadow" onSubmit={handleSubmit}>
        <h1 className="mb-4 text-xl">Sign In</h1>
        {error && <p className="text-red-500">{error}</p>}
        <input className="border p-2 mb-2 w-full" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" className="border p-2 mb-2 w-full" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <input className="border p-2 mb-2 w-full" placeholder="TOTP Code" value={token} onChange={e => setToken(e.target.value)} />
        <button className="bg-blue-500 text-white px-4 py-2" type="submit">Login</button>
      </form>
    </div>
  );
}
