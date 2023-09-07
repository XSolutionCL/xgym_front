import { Navigate, Outlet } from "react-router-dom";
import useValidaToken from "./validToken";
import { useAuthStore } from "../common/store/authStore";
import { toast } from "react-hot-toast";


export const ProtectedRoute = ({
    isAllowed,
    children,
    redirectTo = "/",
  }) => {

    const token = useAuthStore((state) => state.token);
    const logout = useAuthStore((state) => state.logout);
    const {data: validToken, isFetching} = useValidaToken(token)
    
    if (!isAllowed || (!validToken && !isFetching)) {
      logout()
      toast.error("Su sesión expiró. Por favor inicie de nuevo!")
      return <Navigate to={redirectTo} />
    }

    return children ? children : <Outlet />;
  };