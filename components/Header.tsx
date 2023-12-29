import AppLogo from "@/app/components/AppLogo";
import { satisfyFont } from "@/app/layout";
import { Heart, Search } from "lucide-react";
import Link from "next/link";
import React, { FC } from "react";
import { Button } from "./ui/button";

interface HeaderProps {}
const Header: FC<HeaderProps> = (): JSX.Element => {
  return (
    <header className="fixed  md:hidden bg-white top-0 flex items-center justify-between dark:bg-neutral-950 w-full z-50 border-b border-zinc-300 dark:border-neutral-700 px-3 py-2 sm:-ml-5">
      <Link href="/dashboard">
        <p
          className={`font-semibold   text-[30px] mt-2 ${satisfyFont.className}`}
        >
          Darpan
        </p>
      </Link>
      <div className="flex items-center space-x-2 px-2">
        <div className="flex items-center text-neutral-600 dark:text-neutral-400 bg-zinc-200 dark:bg-neutral-900 gap-x-2 rounded-md px-3 py-1">
          <Search className="w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent placeholder:tet-neutral pLaceholder:text-nuetral-500 dark:placeholder:text-neutral-400  flex-1 outline-none"
          />
        </div>
        <div>
          <Button size={"icon"} variant={"ghost"}>
            <Heart />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
