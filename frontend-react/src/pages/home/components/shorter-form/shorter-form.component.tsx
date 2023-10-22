import { useForm } from "react-hook-form";

import { joiResolver } from "@hookform/resolvers/joi";
import {
  shorterFormSchema,
  ShorterForm as ShorterFormType,
} from "@/common/schemas/shorter-form.schema";
import { useAppDispatch } from "@/libs/redux/hooks.ts";
import { createUrl } from "@/libs/redux/url/thunk.ts";

const ShorterForm = () => {
  const { register, handleSubmit } = useForm<ShorterFormType>({
    resolver: joiResolver(shorterFormSchema),
  });
  const dispatch = useAppDispatch();

  const onSubmit = (urlBody: ShorterFormType) => {
    dispatch(createUrl(urlBody));
  };

  return (
    <form className="flex w-1/2 gap-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-4">
        <input
          {...register("url")}
          className="flex-1 w-full rounded-md bg-white px-4 py-3 text-xl font-light tracking-widest text-gray-700 shadow-lg shadow-gray-200/50 outline-none transition focus:shadow-indigo-200/50 active:scale-95"
          placeholder="https://example.com"
        />

        <input
          {...register("expiration")}
          className="rounded-md w-1/4 bg-white px-4 py-3 text-xl font-light tracking-widest text-gray-700 shadow-lg shadow-gray-200/50 outline-none transition focus:shadow-red-200/50 active:scale-95"
          type="text"
          placeholder="1t | 1d | 3d | 7d"
        />
      </div>
      <button
        type="submit"
        className="rounded-md border-2 border-indigo-500 px-7 py-3 font-medium tracking-wide text-indigo-500 shadow-lg shadow-indigo-200/50 transition hover:bg-indigo-500 hover:text-white active:scale-95"
      >
        Shorten
      </button>
    </form>
  );
};

export default ShorterForm;
