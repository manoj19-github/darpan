//   home page

import { redirect } from "next/navigation";
import { FC } from "react";

const HomePage: FC = () => {
  redirect("/dashboard");
};

export default HomePage;
