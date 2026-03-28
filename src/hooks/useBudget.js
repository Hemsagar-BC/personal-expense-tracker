import { useEffect, useState } from "react";
import { supabase } from "../supabase/config";

export const useBudget = () => {
  const [totalBudget, setTotalBudget] = useState(0);
  const [loading, setLoading] = useState(true);
  const [settingsId, setSettingsId] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const timeout = setTimeout(() => setLoading(false), 5000);

    const fetchBudget = async () => {
      const { data, error } = await supabase
        .from("settings")
        .select("id,total_budget")
        .order("id", { ascending: true })
        .limit(1)
        .maybeSingle();

      if (!isMounted) {
        return;
      }

      if (error) {
        console.error("Failed to fetch budget:", error);
        return;
      }

      setSettingsId(data?.id ?? null);
      setTotalBudget(data?.total_budget ?? 0);
    };

    fetchBudget()
      .catch((error) => {
        if (isMounted) {
          console.error("Failed to fetch budget:", error);
        }
      })
      .finally(() => {
        if (isMounted) {
          clearTimeout(timeout);
          setLoading(false);
        }
      });

    const channel = supabase
      .channel("settings_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "settings" },
        () => {
          fetchBudget();
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      clearTimeout(timeout);
      supabase.removeChannel(channel);
    };
  }, []);

  const updateBudget = async (amount) => {
    const value = Number(amount);
    const payload = { total_budget: Number.isFinite(value) ? value : 0 };

    if (settingsId) {
      const { data, error } = await supabase
        .from("settings")
        .update(payload)
        .eq("id", settingsId)
        .select("id,total_budget")
        .single();

      if (error) {
        console.error("Failed to save budget:", error);
        throw error;
      }

      setTotalBudget(data?.total_budget ?? payload.total_budget);
      return;
    }

    const { data, error } = await supabase
      .from("settings")
      .insert(payload)
      .select("id,total_budget")
      .single();

    if (error) {
      console.error("Failed to save budget:", error);
      throw error;
    }

    setSettingsId(data?.id ?? null);
    setTotalBudget(data?.total_budget ?? payload.total_budget);
    console.log("Budget saved successfully:", value);
  };

  return { totalBudget, updateBudget, loading };
};
