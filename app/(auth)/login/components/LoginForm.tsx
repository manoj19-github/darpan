import AppLogo from "@/app/components/AppLogo";
import { satisfyFont } from "@/app/layout";
import { Button } from "@/components/ui/button";
import React, { FC } from "react";

import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import LoginButton from "./LoginButton";
interface LoginFormProps {}
const LoginForm: FC<LoginFormProps> = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center ">
      <p
        className={`font-semibold   text-[40px] lg:text-[70px] lg:mt-[20vh] mt-[10vh] ${satisfyFont.className}`}
      >
        Darpan
      </p>
      <LoginButton />
    </div>
  );
};

export default LoginForm;
