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
