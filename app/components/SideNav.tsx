import React, { FC } from "react";
import AppLogo from "./AppLogo";
import NavLinks from "./NavLinks";
import MoreDropdown from "./MoreDropdown";

interface SideNavProps {}
const SideNav: FC<SideNavProps> = (): JSX.Element => {
  return (
    <div className="flex h-full flex-col px-2 py-2 md:px-2">
      <div className="border-t  -ml-2 md:ml-0 bg-white dark:bg-neutral-950 h-15 justify-evenly fixed z-50 flex-1 w-full md:relative md:h-full bottom-0 md:border-none flex flex-row md:justify-between lg:gap-x-2 gap-x-1  md:flex-col md:space-y-0 md:space-x-0 px-3  ">
        <AppLogo />
        <NavLinks />

        {/* only for user */}
        {/* {!!user ? <ProfileLinks/>:<></> } */}
        <div className="hidden md:flex relative md:mt-auto  items-end w-full flex-[0.4] md:pb-2">
          <MoreDropdown />{" "}
        </div>
      </div>
    </div>
  );
};

export default SideNav;
