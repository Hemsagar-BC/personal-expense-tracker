import { useEffect, useState } from "react";

const BillUpload = ({ onFileSelect }) => {
  const [previewUrl, setPreviewUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      setPreviewUrl("");
      setFileName("");
      setFileType("");
      onFileSelect?.(null);
      return;
    }

    const isImage = file.type.startsWith("image/");
    const isPdf = file.type === "application/pdf";

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    if (isImage) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setFileType("image");
      setFileName(file.name);
    } else if (isPdf) {
      setPreviewUrl("");
      setFileType("pdf");
      setFileName(file.name);
    } else {
      setPreviewUrl("");
      setFileName("");
      setFileType("");
    }

    onFileSelect?.(file);
  };

  return (
    <div className="rounded-2xl border border-dashed border-orange-200 bg-orange-50 p-8 text-slate-700">
      <label className="flex cursor-pointer flex-col items-center gap-4 text-center">
        <input
          type="file"
          accept="image/jpeg,image/png,application/pdf"
          className="hidden"
          onChange={handleChange}
        />
        <span className="rounded-full bg-orange-100 p-6 text-orange-600">
          <svg viewBox="0 0 24 24" className="h-9 w-9">
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <span className="text-lg font-semibold">Upload bill</span>
        <span className="text-base text-slate-500">JPG, PNG, or PDF</span>
      </label>

      {fileType === "image" && previewUrl ? (
        <div className="mt-6 overflow-hidden rounded-xl border border-orange-100">
          <img
            src={previewUrl}
            alt={fileName || "Bill preview"}
            className="h-64 w-full object-cover"
          />
        </div>
      ) : null}

      {fileType === "pdf" && fileName ? (
        <p className="mt-6 text-lg text-slate-600">{fileName}</p>
      ) : null}
    </div>
  );
};

export default BillUpload;
