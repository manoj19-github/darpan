import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React, { FC } from "react";
import { SwitchCamera } from "lucide-react";
import { satisfyFont } from "../layout";

interface AppLogoProps {}
const AppLogo: FC<AppLogoProps> = (): JSX.Element => {
  return (
    <Link
      href="/dashboard"
      className={buttonVariants({
        className: "hidden md:flex navLink   lg:!p-0",
        variant: "ghost",
        size: "lg",
      })}
    >
      <SwitchCamera className="h-6 w-6 shrink-0 lg:hidden" />
      <p
        className={`font-semibold  hidden lg:block text-[30px] mt-2 ${satisfyFont.className}`}
      >
        Darpan
      </p>
    </Link>
  );
};

export default AppLogo;
