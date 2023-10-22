import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { Input } from "@/components/input/input.component";
import {
  SignUpForm as SignUpFormType,
  signUpSchema,
} from "@/common/schemas/sign-up-form.schema";
import { LoginForm as LoginFormType } from "@/common/schemas/login-form.schema.ts";
import { signUpUser } from "@/libs/redux/authentication/thunk.ts";
import { useAppDispatch } from "@/libs/redux/hooks.ts";

export const SignUpForm = () => {
  const { register, handleSubmit, formState } = useForm<SignUpFormType>({
    resolver: joiResolver(signUpSchema),
  });
  const dispatch = useAppDispatch();

  const submitHandler = (data: LoginFormType) => dispatch(signUpUser(data));

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(submitHandler)}
    >
      <Input
        {...register("email")}
        label="Email"
        placeholder="Enter you email here..."
        errorMessage={formState.errors.email?.message}
      />
      <Input
        label="Password"
        placeholder="Enter your password here..."
        type="password"
        {...register("password")}
        errorMessage={formState.errors.password?.message}
      />
      <Input
        label="Repeat password"
        placeholder="Repeat your password here..."
        type="password"
        {...register("repeatPassword")}
        errorMessage={formState.errors.repeatPassword?.message}
      />

      <button
        type="submit"
        className="rounded-md border-2 border-indigo-500 py-3 text-lg font-medium tracking-wide text-indigo-500 transition hover:bg-indigo-500 hover:text-white"
      >
        Sign Up
      </button>
    </form>
  );
};
