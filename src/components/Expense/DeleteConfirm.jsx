const DeleteConfirm = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-orange-100 bg-white p-8 text-slate-900 shadow-xl">
        <h3 className="text-2xl font-semibold">Are you sure?</h3>
        <p className="mt-3 text-base text-slate-600">
          This expense will be removed permanently.
        </p>
        <div className="mt-6 flex gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-lg border border-orange-200 bg-white px-4 py-3 text-base font-semibold text-slate-700 hover:bg-orange-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-slate-900 px-4 py-3 text-lg font-semibold text-white hover:bg-slate-800"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirm;
