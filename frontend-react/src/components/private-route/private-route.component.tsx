import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/libs/redux/hooks.ts";
import { Routes } from "@/common/constants/routes.enum.ts";

type Props = {
  redirectTo: Routes;
  children?: React.ReactNode;
};

export const PrivateRoute: React.FC<Props> = ({ redirectTo, children }) => {
  const { isAuthenticated, isLoading, token } = useAppSelector(
    (state) => state.authentication,
  );

  // on the first load isLoading is false as it is default value in the store, so token && isAuthenticated waits for the request to start
  if (isLoading || (token && !isAuthenticated)) {
    return "Loading...";
  }

  return isAuthenticated ? children : <Navigate to={redirectTo} />;
};
