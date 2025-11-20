import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#121212" }}>

      {/* Sidebar */}
      <div style={{
        width: "240px",
        background: "#1c1c1c",
        color: "white",
        padding: "30px 20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        borderRight: "1px solid #333",
        boxShadow: "2px 0 10px rgba(0,0,0,0.2)"
      }}>
        <h2 style={{
          fontSize: "26px",
          fontWeight: "bold",
          marginBottom: "10px",
          color: "#00e676"
        }}>
          GymApp
        </h2>

        <NavLink to="/exercises" label="🏋️ Exercícios" />
        <NavLink to="/workouts" label="📘 Treinos" />
        <NavLink to="/sessions" label="⏱ Sessões" />
      </div>

      {/* Main content */}
      <div style={{
        flex: 1,
        padding: "35px",
        color: "white",
        fontFamily: "Segoe UI, sans-serif"
      }}>
        {children}
      </div>

    </div>
  );
}

/* ----------------- */
/* Componente NavLink */
/* ----------------- */
function NavLink({ to, label }) {
  return (
    <Link
      to={to}
      style={{
        padding: "12px 15px",
        background: "#292929",
        color: "#e0e0e0",
        textDecoration: "none",
        borderRadius: "8px",
        fontSize: "16px",
        transition: "0.2s",
        display: "block"
      }}
      onMouseEnter={(e) => {
        e.target.style.background = "#00e676";
        e.target.style.color = "#000";
      }}
      onMouseLeave={(e) => {
        e.target.style.background = "#292929";
        e.target.style.color = "#e0e0e0";
      }}
    >
      {label}
    </Link>
  );
}
