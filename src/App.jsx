import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/Layout/Header";
import BottomNav from "./components/Layout/BottomNav";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import History from "./pages/History";

const routeTitles = {
  "/": "Dashboard",
  "/add": "Add Expense",
  "/history": "History",
};

const AppLayout = ({ children }) => {
  const location = useLocation();
  const title = routeTitles[location.pathname] ?? "Kharcha";

  return (
    <div className="min-h-screen bg-orange-50 text-slate-900">
      <Header title={title} />
      <main className="pb-24">{children}</main>
      <BottomNav />
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddExpense />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};

export default App;
