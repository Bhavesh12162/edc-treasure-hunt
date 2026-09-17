'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
 
export default function SubmitForm({ missionId, options, hint }: any) {
  const [selected, setSelected] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showHint, setShowHint] = useState(false);
  const router = useRouter();
  const letters = ['A', 'B', 'C', 'D', 'E'];
 
  async function submit() {
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ missionId, selected }),
    });
    const data = await res.json();
    if (data.correct) {
      setFeedback(`Correct! +${data.pointsAwarded} pts. Fragment: ${data.fragment ?? ''}`);
      setTimeout(() => router.push('/dashboard'), 1500);
    } else {
      setFeedback('Not quite. -10 pts. Try again.');
    }
  }
 
  async function useHint() {
    await fetch('/api/hint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ missionId }),
    });
    setShowHint(true);
  }
 
  return (
    <div className="space-y-3">
      {options.map((opt: string, i: number) => (
        <label key={i} className="flex gap-2 bg-slate-800 p-3 rounded-lg cursor-pointer">
          <input type="radio" name="opt" value={letters[i]}
            onChange={(e) => setSelected(e.target.value)} />
          <span><b>{letters[i]}.</b> {opt}</span>
        </label>
      ))}
      <button onClick={submit} className="w-full bg-amber-600 rounded-lg p-3 font-semibold">Submit</button>
      <button onClick={useHint} className="w-full bg-slate-700 rounded-lg p-2 text-sm">Use Hint (-20 pts)</button>
      {showHint && <p className="text-amber-300 text-sm">Hint: {hint}</p>}
      {feedback && <p className="text-center font-semibold">{feedback}</p>}
    </div>
  );
}
