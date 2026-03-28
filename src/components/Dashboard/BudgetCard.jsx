import { formatCurrency } from "../../utils/formatCurrency";
import { convertNumberToWords } from "../../utils/convertNumberToWords";

const iconMap = {
  budget: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        d="M4 7h16v10H4z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M8 11h4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  spent: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        d="M12 3v18M6 9h12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  remaining: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        d="M4 12c0 4.418 3.582 8 8 8s8-3.582 8-8"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M12 4v4M12 12h4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
};

const BudgetCard = ({ label, amount, type }) => {
  const value = Number(amount) || 0;
  const isRemaining = type === "remaining";
  const remainingClass =
    isRemaining && value <= 0
      ? "border-rose-200 bg-rose-50 text-rose-700"
      : "border-emerald-200 bg-emerald-50 text-emerald-700";

  const baseClass =
    "rounded-2xl border px-5 py-5 shadow-sm backdrop-blur";
  const neutralClass = "border-orange-100 bg-white text-slate-900";

  return (
    <div className={`${baseClass} ${isRemaining ? remainingClass : neutralClass}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-widest text-slate-500">
          {label}
        </span>
        <span className="text-orange-400">{iconMap[type]}</span>
      </div>
      <div className="mt-3">
        <p className="text-4xl font-semibold text-slate-900">
          {formatCurrency(value)}
        </p>
        <p className="mt-1.5 text-xs font-medium text-slate-900">
          {convertNumberToWords(value)}
        </p>
      </div>
    </div>
  );
};

export default BudgetCard;
