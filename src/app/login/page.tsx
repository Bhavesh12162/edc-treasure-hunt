'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
 
export default function LoginPage() {
  const [teamCode, setTeamCode] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
 
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ teamCode, password }),
    });
    if (res.ok) router.push('/dashboard');
    else setError('Invalid Team ID or password.');
  }
 
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold text-center">Enter the Hunt</h1>
        <input className="w-full border rounded-lg p-3" placeholder="Team ID (e.g. EDC-014)"
          value={teamCode} onChange={(e) => setTeamCode(e.target.value)} />
        <input className="w-full border rounded-lg p-3" type="password" placeholder="Password"
          value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button className="w-full bg-amber-600 text-white rounded-lg p-3 font-semibold">
          Unlock Dashboard
        </button>
      </form>
    </main>
  );
}
