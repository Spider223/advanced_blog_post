import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";

const cookie = new Cookies();

export default function ProtectedRoutes() {
  const location = useLocation();
  const token = cookie.get("TOKEN");

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
}
