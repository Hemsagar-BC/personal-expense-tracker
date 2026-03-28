import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import BillUpload from "../components/Expense/BillUpload";
import { useExpenses } from "../hooks/useExpenses";
import { uploadBill } from "../utils/uploadBill";

const AddExpense = () => {
  const navigate = useNavigate();
  const { addExpense } = useExpenses();
  const [place, setPlace] = useState("");
  const [purpose, setPurpose] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [amount, setAmount] = useState("");
  const [billFile, setBillFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getTempId = () => {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!purpose.trim() || !date || !amount) {
      toast.error("Please fill all required fields.");
      return;
    }

    const numericAmount = Number(amount);
    if (!Number.isFinite(numericAmount)) {
      toast.error("Enter a valid amount.");
      return;
    }

    setIsSubmitting(true);

    try {
      let billData = { billURL: null, billType: null };

      if (billFile) {
        const tempId = getTempId();
        billData = await uploadBill(billFile, tempId);
      }

      await addExpense({
        place: place.trim(),
        purpose: purpose.trim(),
        date,
        amount: numericAmount,
        billURL: billData.billURL,
        billType: billData.billType,
      });

      toast.success("Expense added!");
      navigate("/");
    } catch {
      toast.error("Failed to add expense.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-4 pb-24 pt-4">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-orange-100 bg-white p-4 text-slate-900"
      >
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-900">Where (optional)</label>
          <input
            type="text"
            value={place}
            onChange={(event) => setPlace(event.target.value)}
            className="w-full rounded-xl border border-orange-200 bg-white px-3 py-2 text-sm focus:border-orange-400 focus:outline-none"
            placeholder="Place"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-900">What For</label>
          <input
            type="text"
            value={purpose}
            onChange={(event) => setPurpose(event.target.value)}
            required
            className="w-full rounded-xl border border-orange-200 bg-white px-3 py-2 text-sm focus:border-orange-400 focus:outline-none"
            placeholder="Purpose"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900">Date</label>
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
              className="w-full rounded-xl border border-orange-200 bg-white px-3 py-2 text-sm focus:border-orange-400 focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900">Amount (₹)</label>
            <input
              type="number"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              required
              className="w-full rounded-xl border border-orange-200 bg-white px-3 py-2 text-sm focus:border-orange-400 focus:outline-none"
              placeholder="0"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-900">Bill Upload (optional)</label>
          <BillUpload onFileSelect={setBillFile} />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Saving..." : "Add Expense"}
        </button>
      </form>
    </div>
  );
};

export default AddExpense;
