import { Link } from "react-router-dom";
import logo from "../../assets/logo.png"; // Ensure this path correctly points to your logo

const AdminSidebar = ({ activeView, onNavigate }) => {
  const items = [
    { key: "dashboard", label: "Dashboard" },
    { key: "products", label: "Products" },
    { key: "orders", label: "Orders" },
  ];

  return (
    <aside className="w-64 bg-black text-white min-h-screen p-6 shadow-xl">
      {/* Replaced Admin Panel text with Logo Link */}
      <Link to="/" className="flex items-center gap-3 group mb-10 block">
        <div className="bg-white/10 p-2 rounded-xl transition-all duration-300 group-hover:bg-white/20">
          <img
            src={logo}
            alt="Lucía Store"
            className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105 invert brightness-0" // The invert classes help make a dark logo visible on the black background. Adjust if your logo is already white.
          />
        </div>
        <span className="font-semibold text-lg tracking-wide text-white group-hover:text-gray-200">
          Back to Store
        </span>
      </Link>

      <div className="w-full h-px bg-white/10 mb-6" />

      <nav className="flex flex-col gap-3">
        {items.map((item) => (
          <button
            key={item.key}
            onClick={() => onNavigate(item.key)}
            className={`text-left px-4 py-3 rounded-xl transition-all duration-300 ${
              activeView === item.key
                ? "bg-white text-black font-semibold shadow-lg" // Replaced apple-blue with high-contrast active state
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;