import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import { convertNumberToWords } from "../../utils/convertNumberToWords";

const ExpenseCard = ({ expense, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm("Delete this expense?")) {
      onDelete?.(expense.id);
    }
  };

  return (
    <div className="rounded-2xl border border-orange-100 bg-white p-3 text-slate-900">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">{expense.place}</p>
          <p className="text-xs font-medium text-slate-900">{expense.purpose}</p>
          <p className="text-xs font-medium text-slate-900">{formatDate(expense.date)}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <p className="text-xl font-semibold text-slate-900">
            {formatCurrency(expense.amount)}
          </p>
          <p className="text-xs font-medium text-slate-900">
            {convertNumberToWords(expense.amount)}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        {expense.billURL ? (
          <button
            type="button"
            className="flex items-center gap-1 text-xs text-orange-600 hover:text-orange-500"
            onClick={() => window.open(expense.billURL, "_blank", "noopener")}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4">
              <path
                d="M6 3h9l3 3v15H6z"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M9 13h6M9 17h6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            View bill
          </button>
        ) : (
          <span className="text-xs text-slate-500">No bill</span>
        )}
        <button
          type="button"
          onClick={handleDelete}
          className="rounded-lg bg-slate-900 px-3 py-1 text-xs font-semibold text-white hover:bg-slate-800"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ExpenseCard;
