import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../lib/hooks/useAuth";

const PrivateRoutes = () => {
  const user = useAuth();

  if (user) return <Outlet />;

  return <Navigate to={"/auth"} />;
};

export default PrivateRoutes;
