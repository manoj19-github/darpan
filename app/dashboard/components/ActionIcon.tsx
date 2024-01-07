import { Button, ButtonProps } from "@/components/ui/button";
import React, { FC, ReactNode } from "react";

type ActionItemProps = Partial<ButtonProps> & {
  children: ReactNode;
};

const ActionIcon: FC<ActionItemProps> = ({ children, ...buttonProps }) => {
  return (
    <Button
      type="submit"
      variant={"ghost"}
      size="icon"
      className="h-9 w-9"
      {...buttonProps}
    >
      {children}
    </Button>
  );
};

export default ActionIcon;
