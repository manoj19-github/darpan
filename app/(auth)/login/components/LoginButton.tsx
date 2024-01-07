"use client";

import AppLogo from "@/components/AppLogo";
import { satisfyFont } from "@/app/layout";
import { Button } from "@/components/ui/button";
import React, { FC, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import {
  FieldValues,
  RegisterOptions,
  SubmitHandler,
  UseFormRegisterReturn,
  useForm,
} from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
interface LoginButtonProps {}
const LoginButton: FC<LoginButtonProps> = (): JSX.Element => {
  const { pending } = useFormStatus();
  const router = useRouter();
  const [isLoading1, setIsLoading1] = useState<boolean>(false);
  const [isLoading2, setIsLoading2] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  console.log({ errors });
  console.log();
  const signInAction = (credential: any) => {
    if (isLoading1 || isLoading2) return;

    signIn("credentials", { ...credential, redirect: false }).then(
      (callback) => {
        console.log(callback);
        setIsLoading1(false);
        setIsLoading2(false);
        if (callback?.ok) {
          toast.success("Logged in successfully");
          router.push("/dashboard");
          router.refresh();
        }
        if (callback?.status !== 200) toast.error("some thing went wrong");
      }
    );
  };
  const onSubmit1: SubmitHandler<FieldValues> = (data) => {
    console.log("data: ", data);
    setIsLoading1(true);
    const credential = {
      ...data,
      email: process.env.NEXT_PUBLIC_TEST_USER_EMAIL1,
    };
    signInAction(credential);
  };
  const onSubmit2: SubmitHandler<FieldValues> = (data) => {
    console.log("data: ", data);
    setIsLoading2(true);
    const credential = {
      ...data,
      email: process.env.NEXT_PUBLIC_TEST_USER_EMAIL2,
    };
    signInAction(credential);
  };
  useEffect(() => {
    setValue("password", process.env.NEXT_PUBLIC_TEST_USER_PASSWORD);
  }, []);

  return (
    <div className="mt-10 ">
      <Button
        variant={"outline"}
        className="lg:w-[400px] flex w-[300px] "
        aria-disabled={pending}
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      >
        <span className="text-[18px]"> Continue with</span>{" "}
        <FcGoogle className="ml-5 lg:ml-8" size={30} />
      </Button>
      <p className="my-8 text-center">OR</p>
      <Button
        variant={"outline"}
        className="lg:w-[400px] flex  w-[300px]  "
        onClick={handleSubmit(onSubmit1)}
      >
        {isLoading1 ? (
          <span className="text-[18px]"> Please wait ....</span>
        ) : (
          <>
            <span className="text-[18px]"> Continue with</span>{" "}
            <span className="ml-6 block text-[18px]">test user 1</span>
          </>
        )}
      </Button>
      <p className="my-4 text-center">OR</p>
      <Button
        variant={"outline"}
        className="lg:w-[400px] flex  w-[300px]  "
        onClick={handleSubmit(onSubmit2)}
      >
        {isLoading2 ? (
          <span className="text-[18px]"> Please wait ....</span>
        ) : (
          <>
            <span className="text-[18px]"> Continue with</span>{" "}
            <span className="ml-6 block text-[18px]">test user 2</span>
          </>
        )}
      </Button>
    </div>
  );
};

export default LoginButton;
