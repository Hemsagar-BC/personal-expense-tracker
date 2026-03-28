const tabs = [
  { key: "week", label: "This Week" },
  { key: "month", label: "This Month" },
  { key: "all", label: "All Time" },
];

const FilterTabs = ({ active, onChange }) => {
  return (
    <div className="inline-flex rounded-xl border border-orange-200 bg-white p-1">
      {tabs.map((tab) => {
        const isActive = active === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange?.(tab.key)}
            className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
              isActive
                ? "bg-orange-500 text-white"
                : "text-slate-500 hover:text-orange-600"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default FilterTabs;
