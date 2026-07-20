export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-serif font-bold mb-4">404</h1>
        <p className="text-lg mb-8">Página no encontrada</p>
        <a
          href="/"
          className="inline-block px-8 py-3 bg-primary-gold text-white font-medium rounded-lg hover:bg-opacity-90 transition-all"
        >
          Volver al inicio
        </a>
      </div>
    </div>
  );
}
