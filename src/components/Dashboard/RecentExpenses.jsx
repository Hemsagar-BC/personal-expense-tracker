import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import { convertNumberToWords } from "../../utils/convertNumberToWords";

const RecentExpenses = ({ expenses }) => {
  const items = Array.isArray(expenses) ? expenses.slice(0, 5) : [];

  return (
    <section className="rounded-2xl border border-orange-100 bg-white p-4 text-slate-900">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          Recent Expenses
        </h2>
        <Link
          to="/history"
          className="text-xs font-medium text-orange-600 hover:text-orange-500"
        >
          View all
        </Link>
      </div>

      <div className="mt-4 space-y-3">
        {items.length === 0 ? (
          <p className="text-xs text-slate-500">No recent expenses.</p>
        ) : (
          items.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between rounded-xl bg-orange-50 px-3 py-2.5"
            >
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {expense.place}
                </p>
                <p className="text-xs font-medium text-slate-900">
                  {expense.purpose} • {formatDate(expense.date)}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1 text-2xl font-semibold text-slate-900">
                  {expense.billURL ? (
                    <span className="text-orange-500" title="Bill attached">
                      <svg viewBox="0 0 24 24" className="h-7 w-7">
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
                    </span>
                  ) : null}
                  <span>{formatCurrency(expense.amount)}</span>
                </div>
                <span className="text-xs font-medium text-slate-900">
                  {convertNumberToWords(expense.amount)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default RecentExpenses;
