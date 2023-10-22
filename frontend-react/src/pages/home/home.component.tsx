import { useEffect } from "react";
import ShorterForm from "./components/shorter-form/shorter-form.component";
import { useAppDispatch } from "@/libs/redux/hooks";
import { logout } from "@/libs/redux/authentication/slices";
import { loadUrls } from "@/libs/redux/url/thunk.ts";
import { UrlList } from "@/pages/home/components/url-list/url-list.component.tsx";

export const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUrls());
  }, [dispatch]);

  return (
    <div>
      <nav className="fixed flex w-screen justify-end px-20 py-10">
        <button
          className="rounded-md border-2 border-red-500 px-4 py-2 text-red-500 shadow-md shadow-red-200/50 transition hover:bg-red-500 hover:text-gray-100"
          onClick={() => dispatch(logout())}
        >
          Logout
        </button>
      </nav>
      <div className="container flex flex-col gap-10 h-screen items-center justify-center">
        <ShorterForm />
        <UrlList />
      </div>
    </div>
  );
};
