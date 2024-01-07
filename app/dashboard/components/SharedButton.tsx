"use client";

import useMount from "@/hooks/useMount";
import React, { FC, useEffect, useState } from "react";
import ActionIcon from "./ActionIcon";
import { Send } from "lucide-react";
import toast from "react-hot-toast";

interface SharedButtonProps {
  postId: string;
}

const SharedButton: FC<SharedButtonProps> = ({ postId }): JSX.Element => {
  const isMount = useMount();
  if (!isMount) return <></>;
  const handleOnClick = () => {
    window.navigator.clipboard.writeText(
      `${window.location.origin}/dashboard/p/${postId}`
    );
    toast.success("Link copied to clipboard");
  };
  return (
    <ActionIcon onClick={handleOnClick}>
      <Send className="w-6 h-6" />
    </ActionIcon>
  );
};

export default SharedButton;
