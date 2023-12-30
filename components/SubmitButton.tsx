"use client";
import React, { FC, ReactNode } from "react";
import { ButtonProps } from "./ui/button";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = ButtonProps & { children: ReactNode };
const SubmitButton: FC<SubmitButtonProps> = ({
  children,
  ...rest
}): JSX.Element => {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} {...rest}>
      {children}
    </button>
  );
};

export default SubmitButton;
