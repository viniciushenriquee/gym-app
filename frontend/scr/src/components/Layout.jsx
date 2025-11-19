import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* Sidebar */}
      <div style={{
        width: "220px",
        background: "#1f1f1f",
        color: "white",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "15px"
      }}>
        <h2>GymApp</h2>
        <Link to="/exercises" style={{ color: "white" }}>Exercises</Link>
        <Link to="/workouts" style={{ color: "white" }}>Workouts</Link>
        <Link to="/sessions" style={{ color: "white" }}>Sessions</Link>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: "20px" }}>
        {children}
      </div>

    </div>
  );
}