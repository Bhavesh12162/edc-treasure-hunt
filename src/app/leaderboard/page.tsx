import { supabaseAdmin } from '@/lib/supabase/server';

export const revalidate = 5;

export default async function Leaderboard() {
  const { data: teams } = await supabaseAdmin
    .from('teams')
    .select('team_name, score, current_stage, completed_at')
    .order('score', { ascending: false })
    .order('completed_at', { ascending: true });

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-2xl font-bold text-amber-400 mb-4">
        Founders' Board
      </h1>

      <ol className="space-y-2">
        {teams?.map((t: any, i: number) => (
          <li
            key={t.team_name}
            className="flex justify-between bg-slate-800 p-3 rounded-lg"
          >
            <span>
              #{i + 1} {t.team_name}
            </span>

            <span>
              {t.score} pts · Stage {t.current_stage}
            </span>
          </li>
        ))}
      </ol>
    </main>
  );
}