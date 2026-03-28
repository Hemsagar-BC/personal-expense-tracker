import { formatCurrency } from "../../utils/formatCurrency";
import { convertNumberToWords } from "../../utils/convertNumberToWords";

const SpendingBar = ({ totalBudget, totalSpent }) => {
  const budgetValue = Number(totalBudget) || 0;
  const spentValue = Number(totalSpent) || 0;
  const overBudget = budgetValue > 0 && spentValue > budgetValue;
  const percent =
    budgetValue > 0 ? Math.min((spentValue / budgetValue) * 100, 100) : 0;

  return (
    <div className="rounded-2xl border border-orange-100 bg-white p-4 text-slate-900">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm font-medium text-slate-900">
          <span>
            {formatCurrency(spentValue)} spent of {formatCurrency(budgetValue)}
          </span>
          <span className="text-xs">{Math.round(percent)}%</span>
        </div>
        <p className="text-xs font-medium text-slate-900">
          {convertNumberToWords(spentValue)} of {convertNumberToWords(budgetValue)}
        </p>
      </div>
      <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-orange-100">
        <div
          className={`h-full rounded-full transition-all bg-orange-500`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default SpendingBar;
