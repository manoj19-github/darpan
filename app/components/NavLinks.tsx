"use client";
import React, { FC, Fragment } from "react";
import { AppNavLinks } from "../appConfig";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface NavLinksProps {}
const NavLinks: FC<NavLinksProps> = (): JSX.Element => {
  const pathname = usePathname();
  return (
    <Fragment>
      {AppNavLinks.map((self, index) => {
        const Icon = self.icon;
        return (
          <Link
            key={index}
            href={self.href}
            className={buttonVariants({
              variant: pathname === self.href ? "secondary" : "ghost",
              className: cn("space-x-5  !px-3 md:!justify-start", {
                "hidden md:flex": self.hideOnMobile,
              }),
              size: "lg",
            })}
          >
            <Icon className="w-6" />
            <p
              className={`${cn("hidden lg:block", {
                "font-extrabold": pathname === self.href,
              })}`}
            >
              {self.name}
            </p>
          </Link>
        );
      })}
    </Fragment>
  );
};

export default NavLinks;
