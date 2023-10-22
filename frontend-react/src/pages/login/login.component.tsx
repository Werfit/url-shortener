import { Link } from "react-router-dom";
import { LoginForm } from "./components/login-form/login-form.component";
import { Routes } from "@/common/constants/routes.enum";

export const Login = () => {
  return (
    <div className="container flex h-screen items-center justify-center">
      <main className="flex w-1/2 flex-col gap-4 rounded-md bg-white p-8 shadow-lg shadow-gray-200/50">
        <header className="text-xl font-medium tracking-wider text-gray-600">
          Login
        </header>

        <LoginForm />
        <footer className="text-center text-xs text-gray-500">
          Do not have an account yet?{" "}
          <Link to={Routes.SIGN_UP} className="text-indigo-500">
            Sign up
          </Link>{" "}
          here!
        </footer>
      </main>
    </div>
  );
};
