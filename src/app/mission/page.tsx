import { redirect, notFound } from 'next/navigation';
import { getSession } from '@/app/lib/session';
import { supabaseAdmin } from '@/lib/supabase/server';
import SubmitForm from './[id]/SubmitForm';
 
export default async function MissionPage({ params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) redirect('/login');
 
  const { data: team } = await supabaseAdmin
    .from('teams').select('*').eq('id', session.teamId).single();
  const { data: mission } = await supabaseAdmin
    .from('challenges').select('*').eq('id', params.id).single();
 
  if (!mission) notFound();
  if (mission.stage_number > team.current_stage) redirect('/dashboard'); // not earned yet
 
  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-amber-400">Mission {mission.stage_number}: {mission.codename}</h1>
      <p className="italic my-4">{mission.story}</p>
      <p className="font-semibold mb-4">{mission.question}</p>
      <SubmitForm missionId={mission.id} options={mission.options} hint={mission.hint} />
    </main>
  );
}
