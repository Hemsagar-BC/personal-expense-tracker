import { useNavigate } from "react-router-dom";

const FAB = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate("/add")}
      className="fixed bottom-20 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg shadow-orange-500/30 transition hover:bg-orange-400"
      aria-label="Add expense"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <path
          d="M12 5v14M5 12h14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
};

export default FAB;
