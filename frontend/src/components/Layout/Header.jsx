import { Link, NavLink } from "react-router-dom";
import { IoBugSharp } from "react-icons/io5";
export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-screen bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="mx-auto max-w-9xl px-6 h-14 flex items-center justify-between">
        <div className="flex gap-2">
          <IoBugSharp size={25} color="blue" />
          <NavLink
            to="/"
            className="text-base font-semibold tracking-tight text-gray-900"
          >
            De-Bug Tracker{" "}
          </NavLink>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {[
            { name: "Dashboard", path: "/dashboard" },
            { name: "Analytics", path: "/analytics" },
          ].map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `relative transition ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`
              }
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 h-0.5 w-full scale-x-0 bg-blue-600 transition-transform origin-left group-hover:scale-x-100" />
            </NavLink>
          ))}
        </nav>

        {/* Action */}
        <Link
          to="/dashboard"
          className="rounded-md bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-white hover:text-blue-600 transition"
        >
          Have A Bug?
        </Link>
      </div>
    </header>
  );
}
