import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { cleanUpError } from "@/libs/redux/authentication/slices";

type Props = {
  disappearIn: number;
};

let cleaningUpTimeoutId: NodeJS.Timeout;

export const Notification = ({ disappearIn }: Props) => {
  const errorMessage = useAppSelector((state) => state.authentication.error);
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (errorMessage) {
      setIsVisible(true);
      cleaningUpTimeoutId = setTimeout(() => {
        setIsVisible(false);
        dispatch(cleanUpError());
      }, disappearIn);
    }

    return () => clearTimeout(cleaningUpTimeoutId);
  }, [errorMessage, disappearIn, dispatch]);

  return (
    isVisible && (
      <div className="fixed right-10 top-10 w-1/4 rounded-md bg-red-400 px-4 py-3 tracking-wider text-white shadow-md shadow-red-300/50">
        {errorMessage}
      </div>
    )
  );
};
