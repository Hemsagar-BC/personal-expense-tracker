import { useEffect, useState } from "react";
import { supabase } from "../supabase/config";

export const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const timeout = setTimeout(() => setLoading(false), 5000);

    const fetchExpenses = async () => {
      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .order("created_at", { ascending: false });

      if (!isMounted) {
        return;
      }

      if (error) {
        console.error("Failed to fetch expenses:", error);
        return;
      }

      setExpenses(data ?? []);
    };

    fetchExpenses()
      .catch((error) => {
        if (isMounted) {
          console.error("Failed to fetch expenses:", error);
        }
      })
      .finally(() => {
        if (isMounted) {
          clearTimeout(timeout);
          setLoading(false);
        }
      });

    const channel = supabase
      .channel("expenses_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "expenses" },
        () => {
          fetchExpenses();
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      clearTimeout(timeout);
      supabase.removeChannel(channel);
    };
  }, []);

  const addExpense = async (data) => {
    const payload = {
      place: data.place,
      purpose: data.purpose,
      date: data.date,
      amount: data.amount,
      billURL: data.billURL ?? null,
      billType: data.billType ?? null,
      created_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("expenses").insert(payload);

    if (error) {
      console.error("Failed to save expense:", error);
      throw error;
    }

    console.log("Expense saved successfully:", payload);
  };

  const deleteExpense = async (id) => {
    const { error } = await supabase.from("expenses").delete().eq("id", id);

    if (error) {
      console.error("Failed to delete expense:", error);
      throw error;
    }
  };

  return { expenses, addExpense, deleteExpense, loading };
};
