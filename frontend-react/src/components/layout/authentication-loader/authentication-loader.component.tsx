import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { verifyUser } from "@/libs/redux/authentication/thunk";

type Props = {
  children?: React.ReactNode;
};

export const AuthenticationLoader: React.FC<Props> = ({ children }) => {
  const isLoading = useAppSelector((state) => state.authentication.isLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(verifyUser());
  }, [dispatch]);

  return isLoading ? "Loading..." : children;
};
