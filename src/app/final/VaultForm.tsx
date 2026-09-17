'use client';

export default function VaultForm() {
  return (
    <div className="flex flex-col items-center gap-4">
      <input
        type="text"
        placeholder="Enter final treasure code"
        className="px-4 py-2 text-black rounded"
      />

      <button className="px-6 py-2 bg-amber-500 text-black rounded font-bold">
        Unlock Vault
      </button>
    </div>
  );
}