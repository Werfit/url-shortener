import { HTMLAttributes, HTMLInputTypeAttribute, forwardRef } from "react";

type Props = HTMLAttributes<HTMLInputElement> & {
  label?: string;
  type?: HTMLInputTypeAttribute;
  errorMessage?: string;
};

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, errorMessage, ...props }, ref) => {
    return (
      <label className="flex flex-col">
        <span className="text-xs font-medium tracking-widest text-gray-400">
          {label}
        </span>

        <input
          className={`border-b-2  py-2 tracking-wide text-gray-700 outline-none transition ${
            errorMessage
              ? "border-red-600"
              : "border-gray-300 focus:border-gray-600"
          }`}
          ref={ref}
          {...props}
        />

        {errorMessage && (
          <span className="mt-1 text-xs text-red-400">{errorMessage}</span>
        )}
      </label>
    );
  },
);
