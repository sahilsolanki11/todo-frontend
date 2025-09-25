import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#007bff",
        color: "white",
      }}
    >
      <h3 style={{ margin: 0 }}>Todo App</h3>
      <div style={{ display: "flex", gap: "15px" }}>
        {token ? (
          <>
            <Link to="/todos" style={{ color: "white", textDecoration: "none" }}>
              My Todos
            </Link>
            <span>👤 {username || "User"}</span>
            <button
              onClick={handleLogout}
              style={{
                border: "none",
                backgroundColor: "#dc3545",
                color: "#fff",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
              Login
            </Link>
            <Link to="/signup" style={{ color: "white", textDecoration: "none" }}>
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
