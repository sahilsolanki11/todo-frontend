import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login", { replace: true });
  };

  return (
    <>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          background: "linear-gradient(90deg, #6B73FF 0%, #000DFF 100%)",
          color: "white",
          borderRadius: "0 0 15px 15px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        <h3 style={{ margin: 0, fontWeight: "700", fontSize: "24px" }}>Todo App</h3>

        {token && (
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <Link
              to="/todos"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontWeight: "500",
                padding: "6px 12px",
                borderRadius: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                transition: "0.3s",
              }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "rgba(255, 255, 255, 0.35)")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)")
              }
            >
              My Todos
            </Link>

            <span style={{ fontWeight: "500" }}>👤 {username || "User"}</span>

            <button
              onClick={handleLogout}
              style={{
                border: "none",
                background: "linear-gradient(90deg, #FF6B6B 0%, #FFD93D 100%)",
                color: "#fff",
                padding: "6px 14px",
                borderRadius: "8px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* Spacer to push page content below Navbar */}
      <div style={{ height: "70px" }}></div>
    </>
  );
};

export default Navbar;
