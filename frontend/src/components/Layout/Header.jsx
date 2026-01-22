import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoBugSharp } from "react-icons/io5";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext.jsx";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur border-b border-black/10">
      <div className="mx-auto max-w-9xl px-6 h-14 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <IoBugSharp size={24} className="text-blue-500" />
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-base font-semibold tracking-tight transition ${
                isActive ? "text-blue-500" : "text-black"
              }`
            }
          >
            De-Bug Tracker
          </NavLink>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {!user ? (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `text-sm font-medium transition ${
                    isActive ? "text-blue-500" : "text-black"
                  }`
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="rounded-lg border border-blue-500 px-4 py-1.5 text-sm font-medium
                           text-blue-500 transition hover:bg-blue-500 hover:text-white"
              >
                Register
              </NavLink>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="rounded-lg bg-blue-500 px-4 py-1.5 text-sm font-medium
                           text-white transition hover:bg-blue-600"
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="text-sm font-medium text-black transition hover:text-blue-500"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
