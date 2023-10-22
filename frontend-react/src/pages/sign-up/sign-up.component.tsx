import { Link } from "react-router-dom";
import { SignUpForm } from "./components/sign-up-form/sign-up-form.component";
import { Routes } from "@/common/constants/routes.enum";

export const SignUp = () => {
  return (
    <div className="container flex h-screen items-center justify-center">
      <main className="flex w-1/2 flex-col gap-4 rounded-md bg-white p-8 shadow-lg shadow-gray-200/50">
        <header className="text-xl font-medium tracking-wider text-gray-600">
          Sign up
        </header>

        <SignUpForm />
        <footer className="text-center text-xs text-gray-500">
          Already have an account?{" "}
          <Link to={Routes.LOGIN} className="text-indigo-500">
            Login
          </Link>{" "}
          here!
        </footer>
      </main>
    </div>
  );
};
