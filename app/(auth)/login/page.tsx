import React, { FC } from "react";
import LoginForm from "./components/LoginForm";

interface LoginPageProps {}
const LoginPage: FC<LoginPageProps> = (): JSX.Element => {
  return (
    <div className="flex justify-center w-screen   h-screen overdlow-hidden">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
