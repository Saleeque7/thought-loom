import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = () => {
  const userAuth = useSelector((state) => state.persisted.user.isAuthenticated);


  return userAuth ? <Outlet /> : <Navigate to={"/auth/explore"}/>;
};
export const PublicRoute = () => {
  const userAuth = useSelector((state) => state.persisted.user.isAuthenticated);


  return userAuth ?  <Navigate to={"/"}/> : <Outlet /> ;
};
