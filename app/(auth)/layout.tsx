import { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}
const AuthLayout: FC<AuthLayoutProps> = ({ children }): JSX.Element => {
  return <div>{children}</div>;
};

export default AuthLayout;
