import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import ExpenseCard from "../components/Expense/ExpenseCard";
import DeleteConfirm from "../components/Expense/DeleteConfirm";
import EmptyState from "../components/UI/EmptyState";
import FilterTabs from "../components/UI/FilterTabs";
import Loader from "../components/UI/Loader";
import { useExpenses } from "../hooks/useExpenses";
import { formatCurrency } from "../utils/formatCurrency";
import { convertNumberToWords } from "../utils/convertNumberToWords";

const History = () => {
  const { expenses, deleteExpense, loading } = useExpenses();
  const [activeFilter, setActiveFilter] = useState("all");
  const [pendingDelete, setPendingDelete] = useState(null);

  const filteredExpenses = useMemo(() => {
    const today = new Date();

    return expenses.filter((expense) => {
      if (!expense.date) {
        return false;
      }

      const expenseDate = new Date(`${expense.date}T00:00:00`);
      if (Number.isNaN(expenseDate.getTime())) {
        return false;
      }

      if (activeFilter === "week") {
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - 6);
        weekStart.setHours(0, 0, 0, 0);
        return expenseDate >= weekStart && expenseDate <= today;
      }

      if (activeFilter === "month") {
        return (
          expenseDate.getFullYear() === today.getFullYear() &&
          expenseDate.getMonth() === today.getMonth()
        );
      }

      return true;
    });
  }, [expenses, activeFilter]);

  const totalFiltered = useMemo(() => {
    return filteredExpenses.reduce(
      (sum, expense) => sum + Number(expense.amount || 0),
      0
    );
  }, [filteredExpenses]);

  const handleConfirmDelete = async () => {
    if (!pendingDelete) {
      return;
    }

    try {
      await deleteExpense(pendingDelete.id);
      toast.success("Expense deleted!");
      setPendingDelete(null);
    } catch {
      toast.error("Failed to delete expense.");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-3 px-3 pb-24 pt-3">
      <div className="space-y-2 rounded-2xl border border-orange-100 bg-white p-3 text-slate-900">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            History
          </h2>
          <div className="flex flex-col items-end gap-1">
            <span className="text-lg font-semibold">
              {formatCurrency(totalFiltered)}
            </span>
            <span className="text-xs text-slate-500">
              {convertNumberToWords(totalFiltered)}
            </span>
          </div>
        </div>
        <FilterTabs active={activeFilter} onChange={setActiveFilter} />
      </div>

      <div className="space-y-2">{filteredExpenses.length === 0 ? (
          <EmptyState />
        ) : (
          filteredExpenses.map((expense) => (
            <ExpenseCard
              key={expense.id}
              expense={expense}
              onDelete={() => setPendingDelete(expense)}
            />
          ))
        )}
      </div>

      {pendingDelete ? (
        <DeleteConfirm
          onCancel={() => setPendingDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      ) : null}
    </div>
  );
};

export default History;
