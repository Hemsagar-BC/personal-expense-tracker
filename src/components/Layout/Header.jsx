const Header = ({ title }) => {
  return (
    <header className="border-b border-orange-100 bg-white px-4 py-4 text-slate-900 shadow-sm">
      <h1 className="text-2xl font-bold tracking-wide">{title}</h1>
    </header>
  );
};

export default Header;
