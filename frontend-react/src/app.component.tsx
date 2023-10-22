import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ReduxProvider } from "./libs/redux/components/provider.component.tsx";
import { Notification } from "./components/layout/notification/notification.component.tsx";
import { Routes as NavigationRoutes } from "@/common/constants/routes.enum.ts";
import { Home } from "@/pages/home/home.component.tsx";
import { AuthenticationLoader } from "@/components/layout/authentication-loader/authentication-loader.component.tsx";
import { Login } from "@/pages/login/login.component.tsx";
import { SignUp } from "@/pages/sign-up/sign-up.component.tsx";
import { PublicRoute } from "@/components/public-route/public-route.component.tsx";
import { PrivateRoute } from "@/components/private-route/private-route.component.tsx";
import { Redirect } from "@/pages/redirect/redirect.component.tsx";

export const App = () => {
  return (
    <ReduxProvider>
      <Notification disappearIn={7000} />
      <AuthenticationLoader>
        <BrowserRouter>
          <Routes>
            <Route
              path={NavigationRoutes.HOME}
              element={
                <PrivateRoute redirectTo={NavigationRoutes.LOGIN}>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path={NavigationRoutes.LOGIN}
              element={
                <PublicRoute redirectTo={NavigationRoutes.HOME}>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path={NavigationRoutes.SIGN_UP}
              element={
                <PublicRoute redirectTo={NavigationRoutes.HOME}>
                  <SignUp />
                </PublicRoute>
              }
            />
            <Route path={NavigationRoutes.REDIRECT} element={<Redirect />} />
          </Routes>
        </BrowserRouter>
      </AuthenticationLoader>
    </ReduxProvider>
  );
};
