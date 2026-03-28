const formatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export const formatCurrency = (amount) => {
  const value = Number(amount);
  if (!Number.isFinite(value)) {
    return "₹0";
  }

  return formatter.format(value);
};
