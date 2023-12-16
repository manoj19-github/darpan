import React, { FC } from "react";
import AppLogo from "./AppLogo";

interface SideNavProps {}
const SideNav: FC<SideNavProps> = (): JSX.Element => {
  return (
    <div>
      <div>
        <AppLogo />
        {/* <NavLinks/> */}
        {/* only for user */}
        {/* {!!user ? <ProfileLinks/>:<></> } */}
        <div>{/* <MoreDropdown/> */}</div>
      </div>
    </div>
  );
};

export default SideNav;
