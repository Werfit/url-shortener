import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { Input } from "@/components/input/input.component";
import {
  LoginForm as LoginFormType,
  loginSchema,
} from "@/common/schemas/login-form.schema";
import { useAppDispatch } from "@/libs/redux/hooks";
import { loginUser } from "@/libs/redux/authentication/thunk";

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const { register, formState, handleSubmit } = useForm<LoginFormType>({
    resolver: joiResolver(loginSchema),
  });

  const submitHandler = (data: LoginFormType) => dispatch(loginUser(data));

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(submitHandler)}
    >
      <Input
        label="Email"
        placeholder="Enter you email here..."
        {...register("email")}
        errorMessage={formState.errors.email?.message}
      />
      <Input
        label="Password"
        placeholder="Enter your password here..."
        type="password"
        {...register("password")}
        errorMessage={formState.errors.password?.message}
      />

      <button
        type="submit"
        className="rounded-md border-2 border-indigo-500 py-3 text-lg font-medium tracking-wide text-indigo-500 transition hover:bg-indigo-500 hover:text-white"
      >
        Login
      </button>
    </form>
  );
};
