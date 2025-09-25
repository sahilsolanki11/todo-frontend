import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import TodoList from './components/TodoList';
import Navbar from './components/Navbar';
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute"; // ✅ new import

function App() {
  return (
    <Router>
      {/* Navbar always visible */}
      <Navbar />

      <Routes>
        {/* Public routes → redirect to /todos if already logged in */}
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Protected route → needs login */}
        <Route
          path="/todos"
          element={
            <ProtectedRoute>
              <TodoList />
            </ProtectedRoute>
          }
        />

        {/* Default route → redirect to login */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
