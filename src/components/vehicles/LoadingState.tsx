export default function LoadingState() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Memuat Detail Kendaraan
        </h2>
        <p className="text-gray-600">Mohon tunggu sebentar...</p>
      </div>
    </div>
  );
}
