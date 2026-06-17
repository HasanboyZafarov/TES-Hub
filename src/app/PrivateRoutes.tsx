import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../lib/hooks/useAuth";

const PrivateRoutes = () => {
  const isLoggedIn = useAuth();
  if (!isLoggedIn) return <Navigate to={"/auth"} />;

  return <Outlet />;
};

export default PrivateRoutes;
