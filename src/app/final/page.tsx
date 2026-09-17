import { redirect } from 'next/navigation';
import { getSession } from '@/app/lib/session';
import { supabaseAdmin } from '@/lib/supabase/server';
import VaultForm from './VaultForm';

export default async function FinalPage() {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  const { data: team } = await supabaseAdmin
    .from('teams')
    .select('*')
    .eq('id', session.teamId)
    .single();

  if (!team) {
    redirect('/dashboard');
  }

  if (team.current_stage < 13) {
    redirect('/dashboard');
  }

  return (
    <main className="min-h-screen bg-black text-amber-400 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">
        The Final Vault
      </h1>

      <p className="mb-6 text-center max-w-md">
        Combine every fragment you've collected into the treasure code below.
      </p>

      <VaultForm />
    </main>
  );
}