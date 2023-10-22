import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks.ts";
import { deactivateUrl } from "@/libs/redux/url/thunk.ts";

export const UrlList = () => {
  const { urls, isLoading } = useAppSelector((state) => state.url);
  const dispatch = useAppDispatch();

  return (
    <div className="w-full flex flex-col gap-3">
      {isLoading
        ? "Loading..."
        : urls.map((url, index) => (
            <div
              key={index}
              className="w-full flex items-center bg-white justify-between px-10 py-4 rounded-md shadow-md shadow-gray-200/50 "
            >
              <span>{url.url}</span>
              <span>{`${window.location.origin}/${url.hash}`}</span>
              <span>{url.visited}</span>

              <button
                className="px-4 py-2 border-2 border-red-400 rounded-md text-red-400 hover:bg-red-400 hover:text-white transition"
                onClick={() => dispatch(deactivateUrl({ hash: url.hash }))}
              >
                Deactivate
              </button>
            </div>
          ))}
    </div>
  );
};
