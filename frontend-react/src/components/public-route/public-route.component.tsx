import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/libs/redux/hooks.ts";
import { Routes } from "@/common/constants/routes.enum.ts";

type Props = {
  redirectTo: Routes;
  children?: React.ReactNode;
};

export const PublicRoute: React.FC<Props> = ({ redirectTo, children }) => {
  const { isAuthenticated, isLoading, token } = useAppSelector(
    (state) => state.authentication,
  );

  if (isLoading || (token && !isAuthenticated)) {
    return "Loading...";
  }

  return isAuthenticated ? <Navigate to={redirectTo} /> : children;
};
