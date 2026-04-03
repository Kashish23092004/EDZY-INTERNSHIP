import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Users } from "lucide-react";

export default function Navbar() {
  const { pathname } = useLocation();
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">🍽️</span>
        <div>
          <h1 className="brand-name">Edzy Canteen</h1>
          <p className="brand-tagline">Sector 63, Gurugram</p>
        </div>
      </div>
      <div className="nav-links">
        <Link to="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>
          <ShoppingBag size={16} /> Menu
        </Link>
        <Link to="/students" className={`nav-link ${pathname === "/students" ? "active" : ""}`}>
          <Users size={16} /> Students
        </Link>
      </div>
    </nav>
  );
}