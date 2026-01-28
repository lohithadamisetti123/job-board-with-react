import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const isActive = (path) =>
    location.pathname === path ? "font-bold text-gray-100" : "text-gray-500";

  return (
    <nav className="flex items-center justify-between px-4 py-3 border-b bg-panel shadow-md">
      <div className="text-xl font-bold text-gray-100 tracking-tight">
        Job <span style={{ color: "#4f46e5" }}>Board</span>
      </div>
      <div className="flex gap-4 text-sm">
        <Link className={isActive("/")} to="/">
          Jobs
        </Link>
        <Link className={isActive("/tracker")} to="/tracker">
          Tracker
        </Link>
      </div>
    </nav>
  );
}
