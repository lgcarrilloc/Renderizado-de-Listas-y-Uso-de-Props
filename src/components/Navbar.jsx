import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>🎮 GameStore</h2>

      <div>
        <Link to="/">Inventario</Link>

        <Link to="/nuevo">
          Nuevo Juego
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;