import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import type { JSX } from "react";

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { role } = useAuth();
  return role === "admin" ? children : <Navigate to="/login" replace />;
};

export default AdminRoute;
