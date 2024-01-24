import { Navigate, Outlet, useNavigate, useLocation} from "react-router-dom";
import { useAuthStore } from "../common/store/authStore";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { useToken } from "../hooks/token";


export const ProtectedRoute = ({ isAllowed, children, redirectTo = "/" }) => {
  const location = useLocation()
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const { isTokenValid, isLoading, error } = useToken();

  useEffect(() => {
    const handleLogout = async () => {
      if (!isAllowed && !isTokenValid && location.pathname !== "/" && !isLoading && !error) {
        await logout();
        toast.error("Su sesión expiró. Por favor inicie de nuevo!");
        navigate(redirectTo);
      }
    };

    handleLogout();
  }, [isAllowed, logout, navigate, redirectTo, isTokenValid, isLoading, error]);

  return isAllowed ? (children ? children : <Outlet />) : <Navigate to={redirectTo} />;
};
