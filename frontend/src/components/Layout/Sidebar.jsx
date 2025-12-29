import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, BarChart3, ChevronLeft, ChevronRight } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(() => {
    const saved = localStorage.getItem("sidebarOpen");
    return saved === null ? true : saved === "true";
  });

  useEffect(() => {
    localStorage.setItem("sidebarOpen", isOpen);
  }, [isOpen]);

  const baseClass =
    "flex items-center gap-3 px-4 py-2 rounded-sm transition-all";

  return (
    <aside
      className={`sticky top-0 h-[calc(100vh-64px)]
      border-r border-gray-200
      bg-white py-4 px-2
      flex flex-col transition-all duration-100
      ${isOpen ? "w-60" : "w-16"}`}
    >
      <div className="flex items-center justify-between mb-6">
        {isOpen && (
          <h2 className="text-sm font-semibold text-gray-800">
            My App
          </h2>
        )}

        <button
          onClick={() => setIsOpen((p) => !p)}
          className="p-2 rounded-sm hover:bg-gray-100"
        >
          {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      <nav className="space-y-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${baseClass} ${
              isActive
                ? "bg-blue-100 text-blue-700"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <LayoutDashboard size={18} />
          {isOpen && <span>Dashboard</span>}
        </NavLink>

        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            `${baseClass} ${
              isActive
                ? "bg-blue-100 text-blue-700"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <BarChart3 size={18} />
          {isOpen && <span>Analytics</span>}
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
