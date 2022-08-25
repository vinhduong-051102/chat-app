import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLogin } from "~/features/auth/authSlice";

const Protected = () => {
  const isLogin = useSelector(selectIsLogin);
  return isLogin ? <Outlet /> : <Navigate to='/login' />;
};

export default Protected;
