 import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { supabaseAdmin } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
export async function POST(req: Request) {
  const { teamCode, password } = await req.json();
 
  const { data: team } = await supabaseAdmin
    .from('teams').select('*').eq('team_code', teamCode).single();
 
  if (!team || team.password_hash !== password) {   // swap for bcrypt.compare in production
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
 
  const token = jwt.sign({ teamId: team.id, teamCode: team.team_code }, process.env.JWT_SECRET!, {
    expiresIn: '6h',
  });
 
  const cookieStore = await cookies();

cookieStore.set('session', token, {
  httpOnly: true,
  path: '/',
  sameSite: 'lax'
});
}
