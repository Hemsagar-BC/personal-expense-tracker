const EmptyState = () => {
  return (
    <div className="flex flex-col items-center gap-6 rounded-2xl border border-orange-100 bg-white px-10 py-20 text-center text-slate-600">
      <span className="rounded-full bg-orange-100 p-6 text-orange-600">
        <svg viewBox="0 0 24 24" className="h-10 w-10">
          <path
            d="M12 5v14M5 12h14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <p className="text-xl font-semibold">No expenses yet. Tap + to add one.</p>
    </div>
  );
};

export default EmptyState;
