import { cn } from "@/lib/utils";
import React, { FC } from "react";

interface ViewPostProps {
  className?: string;
}

const ViewPost: FC<ViewPostProps> = ({ className }): JSX.Element => {
  return (
    <div className={cn("flex p-3", className)}>
      <button className="text-sky-500 hover:text-sky-700 font-semibold text-sm">
        View post
      </button>
    </div>
  );
};

export default ViewPost;
