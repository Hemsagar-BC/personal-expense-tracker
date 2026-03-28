import { supabase } from "../supabase/config";

export const uploadBill = async (file, expenseId) => {
  if (!file) {
    throw new Error("File is required.");
  }

  const isPdf = file.type === "application/pdf";
  const isImage = file.type.startsWith("image/");

  if (!isPdf && !isImage) {
    throw new Error("Unsupported file type.");
  }

  const billType = isPdf ? "pdf" : "image";
  const filePath = `${expenseId}/${file.name}`;

  const { error: uploadError } = await supabase.storage
    .from("bills")
    .upload(filePath, file, { upsert: true });

  if (uploadError) {
    throw uploadError;
  }

  const { data } = supabase.storage.from("bills").getPublicUrl(filePath);
  const billURL = data?.publicUrl;

  if (!billURL) {
    throw new Error("Failed to get bill URL.");
  }

  return { billURL, billType };
};
