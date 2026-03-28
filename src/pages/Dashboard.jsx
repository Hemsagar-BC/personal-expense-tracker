import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useBudget } from "../hooks/useBudget";
import { useExpenses } from "../hooks/useExpenses";
import BudgetCard from "../components/Dashboard/BudgetCard";
import SpendingBar from "../components/Dashboard/SpendingBar";
import RecentExpenses from "../components/Dashboard/RecentExpenses";
import FAB from "../components/UI/FAB";
import Loader from "../components/UI/Loader";

const formatAmountDisplay = (value) => {
  // Remove all commas and non-digit characters
  const numericOnly = value.replace(/[^\d]/g, "");
  
  // Format with Indian commas (1,00,000 style)
  if (!numericOnly) return "";
  
  const parts = numericOnly.split("").reverse();
  const result = [];
  
  for (let i = 0; i < parts.length; i++) {
    if (i === 3 || i === 5 || i === 7 || i === 9) {
      result.push(",");
    }
    result.push(parts[i]);
  }
  
  return result.reverse().join("");
};

const Dashboard = () => {
  const { totalBudget, updateBudget, loading: budgetLoading } = useBudget();
  const { expenses, loading: expensesLoading } = useExpenses();
  const [isEditing, setIsEditing] = useState(false);
  const [draftBudget, setDraftBudget] = useState(0);

  useEffect(() => {
    if (!isEditing) {
      setDraftBudget(totalBudget ?? 0);
    }
  }, [totalBudget, isEditing]);

  const totalSpent = useMemo(() => {
    return expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
  }, [expenses]);

  const remaining = (Number(totalBudget) || 0) - totalSpent;
  const isLoading = budgetLoading || expensesLoading;

  const handleBudgetChange = (event) => {
    const input = event.target.value;
    setDraftBudget(formatAmountDisplay(input));
  };

  const handleSaveBudget = async () => {
    const numericValue = Number(draftBudget.replace(/[^\d]/g, ""));
    if (!Number.isFinite(numericValue) || numericValue === 0) {
      toast.error("Enter a valid budget amount.");
      return;
    }

    try {
      await updateBudget(numericValue);
      toast.success("Budget updated!");
      setIsEditing(false);
    } catch (error) {
      console.error("Budget update error:", error);
      toast.error("Failed to update budget.");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="relative space-y-4 px-4 pb-24 pt-5">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-600">
            Total Budget
          </p>
          <button
            type="button"
            onClick={() => setIsEditing((prev) => !prev)}
            className="rounded-lg border border-orange-200 bg-white px-2 py-1.5 text-xs font-semibold text-slate-600 hover:border-orange-300 hover:text-orange-600"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>
        <BudgetCard label="Total Budget" amount={totalBudget} type="budget" />
        {isEditing ? (
          <div className="flex items-center gap-2.5">
            <input
              type="text"
              value={draftBudget}
              onChange={handleBudgetChange}
              className="w-full rounded-xl border border-orange-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-orange-400 focus:outline-none"
              placeholder="Enter budget"
              inputMode="numeric"
            />
            <button
              type="button"
              onClick={handleSaveBudget}
              className="rounded-xl bg-orange-500 px-4 py-2 text-xs font-semibold text-white hover:bg-orange-400"
            >
              Save
            </button>
          </div>
        ) : null}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <BudgetCard label="Total Spent" amount={totalSpent} type="spent" />
        <BudgetCard label="Remaining" amount={remaining} type="remaining" />
      </div>

      <SpendingBar totalBudget={totalBudget} totalSpent={totalSpent} />
      <RecentExpenses expenses={expenses} />

      <FAB />
    </div>
  );
};

export default Dashboard;
