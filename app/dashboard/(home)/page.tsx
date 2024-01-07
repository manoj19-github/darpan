import PostSection from "@/app/components/PostSection";
import React, { FC, Suspense } from "react";

interface DashboardProps {}
const Dashboard: FC<DashboardProps> = ({}): JSX.Element => {
  return (
    <main className="flex w-full flex-grow  ">
      <div className="flex flex-col flex-1 gap-y-8 max-w-lg mx-auto pb-20">
        <Suspense>
          <PostSection />
        </Suspense>
      </div>
    </main>
  );
};

export default Dashboard;
