import { NextResponse } from 'next/server';
import { getSession } from '@/app/lib/session';
import { supabaseAdmin } from '@/lib/supabase/server';
 
export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Not logged in' }, { status: 401 });
 
  const { missionId, selected } = await req.json();
 
  const { data: team } = await supabaseAdmin.from('teams').select('*').eq('id', session.teamId).single();
  const { data: mission } = await supabaseAdmin.from('challenges').select('*').eq('id', missionId).single();
 
  // Guard: team must currently be on this exact stage
  if (mission.stage_number !== team.current_stage) {
    return NextResponse.json({ error: 'This is not your current mission' }, { status: 403 });
  }
 
const isCorrect = selected === mission.correct_option;
 
  await supabaseAdmin.from('submissions').insert({
    team_id: team.id, challenge_id: mission.id, selected_option: selected, correct: isCorrect,
  });
 
  if (isCorrect) {
    await supabaseAdmin.from('teams').update({
      score: team.score + mission.points,
      current_stage: team.current_stage + 1,
      completed_at: mission.stage_number === 12 ? new Date().toISOString() : team.completed_at,
    }).eq('id', team.id);
 
    return NextResponse.json({ correct: true, pointsAwarded: mission.points, fragment: mission.fragment });
  } else {
    await supabaseAdmin.from('teams').update({ score: Math.max(0, team.score - mission.penalty) }).eq('id', team.id);
    return NextResponse.json({ correct: false });
  }
}
