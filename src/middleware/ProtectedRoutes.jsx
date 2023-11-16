import { Navigate, Outlet, useNavigate } from "react-router-dom";
import validaToken from "./validToken";
import { useAuthStore } from "../common/store/authStore";
import { toast } from "react-hot-toast";
import { useEffect } from "react";


export const ProtectedRoute = ({ isAllowed, children, redirectTo = "/" }) => {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  const { data: validToken, isFetching } = validaToken(token);

  useEffect(() => {
    const handleLogout = async () => {
      if (!isAllowed || (!validToken && !isFetching)) {
        await logout();
        toast.error("Su sesión expiró. Por favor inicie de nuevo!");
        navigate(redirectTo);
      }
    };

    handleLogout();
  }, [isAllowed, validToken, isFetching, logout, navigate, redirectTo]);

  return isAllowed ? (children ? children : <Outlet />) : <Navigate to={redirectTo} />;
};
