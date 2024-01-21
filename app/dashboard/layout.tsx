import { FC, ReactNode } from "react";
import SideNav from "../../components/SideNav";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({
  children,
}): JSX.Element => {
  return (
    <div className="flex h-screen flex-col md:flex-row overflow-x-hidden overflow-y-auto ">
      <div className="w-20 flex-none lg:w-64 md:border-r">
        <SideNav />
      </div>
      <div className="flex-grow mt-12 md:mt-0 flex-1 w-full md:overflow-y-auto overflow-x-hidden sm:p-6 md:p-12 max-w-7xl mx-auto ">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
