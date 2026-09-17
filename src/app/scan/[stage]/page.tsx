type PageProps = {
  params: Promise<{
    stage: string;
  }>;
};

export default async function ScanPage({ params }: PageProps) {
  const { stage } = await params;

  const stageNumber = Number(stage);

  if (
    !Number.isInteger(stageNumber) ||
    stageNumber < 1 ||
    stageNumber > 12
  ) {
    return (
      <main style={{ padding: '40px', textAlign: 'center' }}>
        <h1>Invalid QR Code</h1>
        <p>This treasure-hunt stage does not exist.</p>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          width: '100%',
          textAlign: 'center',
          padding: '40px',
          borderRadius: '20px',
          border: '1px solid #ddd',
        }}
      >
        <h1>🔐 EDC Digital Treasure Hunt</h1>

        <h2>Stage {stageNumber}</h2>

        <p>
          You have discovered Stage {stageNumber}.
        </p>

        <p>
          Your next challenge awaits. Solve the clue to continue
          the treasure hunt.
        </p>

        <button
          style={{
            marginTop: '20px',
            padding: '12px 24px',
            borderRadius: '10px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Start Challenge
        </button>
      </div>
    </main>
  );
}