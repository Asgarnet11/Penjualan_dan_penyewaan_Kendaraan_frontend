interface ErrorStateProps {
  error: string;
}

export default function ErrorState({ error }: ErrorStateProps) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center bg-white p-8 rounded-xl shadow-lg border border-red-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Terjadi Kesalahan
        </h3>
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Coba Lagi
        </button>
      </div>
    </div>
  );
}
