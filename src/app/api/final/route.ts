import { NextResponse } from 'next/server';
import { getSession } from '@/app/lib/session';
import { supabaseAdmin } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const code = String(body.code || '').trim();

    const finalCode = process.env.FINAL_TREASURE_CODE;

    if (!finalCode) {
      return NextResponse.json(
        { error: 'Final treasure code is not configured' },
        { status: 500 }
      );
    }

    if (code !== finalCode) {
      return NextResponse.json(
        { error: 'Incorrect treasure code' },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from('teams')
      .update({
        current_stage: 13,
        completed_at: new Date().toISOString(),
      })
      .eq('id', session.teamId);

    if (error) {
      console.error('Final vault update error:', error);

      return NextResponse.json(
        { error: 'Could not complete the treasure hunt' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Treasure hunt completed!',
    });
  } catch (error) {
    console.error('Final API error:', error);

    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 500 }
    );
  }
}