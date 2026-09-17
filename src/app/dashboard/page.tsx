import { redirect } from 'next/navigation';
import { getSession } from '@/app/lib/session';
import { supabaseAdmin } from '@/lib/supabase/server';
 
export default async function Dashboard() {
  const session = await getSession();
  if (!session) redirect('/login');
 
  const { data: team } = await supabaseAdmin
    .from('teams').select('*').eq('id', session.teamId).single();
  const { data: challenges } = await supabaseAdmin
    .from('challenges').select('id, stage_number, codename').order('stage_number');
 
  const progressPct = Math.round((team.current_stage - 1) / (challenges?.length || 1) * 100);
 
  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-xl font-bold">TEAM: {team.team_name}   SCORE: {team.score}</h1>
      <div className="w-full bg-slate-800 rounded-full h-3 my-4">
        <div className="bg-amber-500 h-3 rounded-full" style={{ width: `${progressPct}%` }} />
      </div>
      <ul className="space-y-2">
        {challenges?.map((c) => {
          const unlocked = c.stage_number <= team.current_stage;
          return (
            <li key={c.id} className={`p-3 rounded-lg ${unlocked ? 'bg-slate-800' : 'bg-slate-900 opacity-50'}`}>
              {unlocked ? '✓' : '🔒'} Mission {c.stage_number}: {unlocked ? c.codename : '?????'}
              {unlocked && c.stage_number === team.current_stage && (
                <a href={`/mission/${c.id}`} className="ml-3 text-amber-400 underline">Open</a>
              )}
            </li>
          );
        })}
      </ul>
    </main>
  );
}

