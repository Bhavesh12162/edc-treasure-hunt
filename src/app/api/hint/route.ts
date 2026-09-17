import { NextResponse } from 'next/server';
import { getSession } from '@/app/lib/session';
import { supabaseAdmin } from '@/lib/supabase/server';

export async function POST(req: Request) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      { error: 'Not logged in' },
      { status: 401 }
    );
  }

  const { missionId } = await req.json();

  if (!missionId) {
    return NextResponse.json(
      { error: 'Mission ID is required' },
      { status: 400 }
    );
  }

  // Check whether this hint has already been used
  const { data: already } = await supabaseAdmin
    .from('hints_used')
    .select('id')
    .eq('team_id', session.teamId)
    .eq('challenge_id', missionId)
    .maybeSingle();

  if (already) {
    return NextResponse.json({ ok: true });
  }

  // Get mission/hint penalty
  const { data: mission, error: missionError } = await supabaseAdmin
    .from('challenges')
    .select('hint_penalty')
    .eq('id', missionId)
    .single();

  if (missionError || !mission) {
    return NextResponse.json(
      { error: 'Mission not found' },
      { status: 404 }
    );
  }

  // Get team score
  const { data: team, error: teamError } = await supabaseAdmin
    .from('teams')
    .select('score')
    .eq('id', session.teamId)
    .single();

  if (teamError || !team) {
    return NextResponse.json(
      { error: 'Team not found' },
      { status: 404 }
    );
  }

  // Apply hint penalty
  await supabaseAdmin
    .from('teams')
    .update({
      score: Math.max(0, team.score - mission.hint_penalty),
    })
    .eq('id', session.teamId);

  // Record that the hint was used
  await supabaseAdmin
    .from('hints_used')
    .insert({
      team_id: session.teamId,
      challenge_id: missionId,
    });

  return NextResponse.json({ ok: true });
}