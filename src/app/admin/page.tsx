import { supabaseAdmin } from '@/lib/supabase/server';

export default async function AdminPage() {
  const { data: teams } = await supabaseAdmin
    .from('teams')
    .select('*')
    .order('score', { ascending: false });

  const { data: submissions } = await supabaseAdmin
    .from('submissions')
    .select('*, teams(team_name), challenges(codename)')
    .order('submitted_at', { ascending: false })
    .limit(50);

  return (
    <main className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-bold mb-4">
        EDC Admin – Live Monitor
      </h1>

      <table className="w-full text-sm border">
        <thead className="bg-slate-900 text-white">
          <tr>
            <th className="p-2 text-left">Team</th>
            <th>Score</th>
            <th>Stage</th>
            <th>Started</th>
            <th>Completed</th>
          </tr>
        </thead>

        <tbody>
          {teams?.map((t: any) => (
            <tr key={t.id} className="border-b">
              <td className="p-2">{t.team_name}</td>
              <td>{t.score}</td>
              <td>{t.current_stage}</td>
              <td>{t.started_at}</td>
              <td>{t.completed_at ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-xl font-bold mt-8 mb-2">
        Recent submissions
      </h2>

      <ul className="space-y-2">
        {submissions?.map((s: any) => (
          <li key={s.id}>
            {s.teams?.team_name} → {s.challenges?.codename}:{' '}
            {s.correct ? '✅' : '❌'}
          </li>
        ))}
      </ul>
    </main>
  );
}