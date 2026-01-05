import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

function ProtectedLayout() {
  // function ProtectedLayout() {
  //   const { isAuthenticated } = useAuth();

  //   return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  // }

  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedLayout;
