import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isLoggedIn = JSON.parse(localStorage.getItem("user"));
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
}