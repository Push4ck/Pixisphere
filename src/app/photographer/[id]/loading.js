export default function Loading() {
  return (
    <div className="fixed inset-0 bg-gray-100 flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
        <p className="text-gray-700 mt-4 text-lg">
          Loading photographer profile...
        </p>
      </div>
    </div>
  );
}
