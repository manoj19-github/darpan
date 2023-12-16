import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React, { FC } from "react";
import { SwitchCamera } from "lucide-react";
import { Satisfy } from "next/font/google";

const satisfy = Satisfy({
  weight: ["400"],
  subsets: ["latin"],
});
interface AppLogoProps {}
const AppLogo: FC<AppLogoProps> = (): JSX.Element => {
  return (
    <Link
      href="/dashboard"
      className={buttonVariants({
        className:
          "hidden md:flex navLink !mb-10 kg:hover:bg-transparent lg:!p-0",
        variant: "ghost",
        size: "lg",
      })}
    >
      <SwitchCamera className="h-6 w-6 shrink-0 lg:hidden" />
      <p
        className={`font-semibold  hidden lg:block text-[40px] mt-4 ${satisfy.className}`}
      >
        Darpan
      </p>
    </Link>
  );
};

export default AppLogo;
