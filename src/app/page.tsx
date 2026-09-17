import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-extrabold text-amber-500 mb-4">EDC × IIM JAMMU</h1>
      <h2 className="text-2xl font-bold mb-6">THE DIGITAL TREASURE HUNT</h2>
      <p className="max-w-md text-slate-300 mb-8">
        Decode. Discover. Innovate. Solve 12 entrepreneurship challenges across campus to unlock the Final Vault.
      </p>
      <Link 
        href="/login" 
        className="bg-amber-600 hover:bg-amber-500 text-white font-semibold px-6 py-3 rounded-xl transition"
      >
        Enter the Hunt
      </Link>
    </main>
  );
}