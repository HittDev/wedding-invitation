'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-serif font-bold mb-4">Oops!</h1>
        <p className="text-lg mb-4">Algo salió mal</p>
        <p className="text-sm text-gray-600 mb-8">{error.message}</p>
        <button
          onClick={() => reset()}
          className="inline-block px-8 py-3 bg-primary-gold text-white font-medium rounded-lg hover:bg-opacity-90 transition-all"
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
}
