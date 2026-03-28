const EmptyState = () => {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-orange-100 bg-white px-6 py-10 text-center text-slate-600">
      <span className="rounded-full bg-orange-100 p-3 text-orange-600">
        <svg viewBox="0 0 24 24" className="h-6 w-6">
          <path
            d="M12 5v14M5 12h14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <p className="text-sm">No expenses yet. Tap + to add one.</p>
    </div>
  );
};

export default EmptyState;
