import Header from "@/components/Header";
import React, { FC, ReactNode } from "react";

interface DashboardHomeLayoutProps {
  children: ReactNode;
}
const DashboardHomeLayout: FC<DashboardHomeLayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default DashboardHomeLayout;
