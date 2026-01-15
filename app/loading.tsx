export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100 flex items-center justify-center">
      <div className="text-center">
        {/* Spinning loader */}
        <div className="inline-block relative w-20 h-20 mb-6">
          <div className="absolute border-4 border-gold-200 rounded-full w-20 h-20"></div>
          <div className="absolute border-4 border-gold-500 rounded-full w-20 h-20 animate-spin border-t-transparent"></div>
        </div>

        <p className="text-lg font-medium text-charcoal-900 animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
