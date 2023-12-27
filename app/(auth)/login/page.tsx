import React, { FC } from "react";
import LoginForm from "./components/LoginForm";
import { auth } from "@/app/config/authConfig";
import { redirect } from "next/navigation";

interface LoginPageProps {}
const LoginPage: FC<LoginPageProps> = async (): Promise<JSX.Element> => {
  const session = await auth();

  const user = session?.user;
  if (!!user) redirect("/dashboard");
  return (
    <div className="flex justify-center w-screen   h-screen overdlow-hidden">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
