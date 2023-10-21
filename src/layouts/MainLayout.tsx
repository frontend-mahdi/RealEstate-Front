import SideDrawer from "@/components/SideNav";
import { FC, ReactElement } from "react";

export interface MainLayoutType {
  children: ReactElement;
}

const MainLayout: FC<MainLayoutType> = ({ children }) => {
  return <SideDrawer>{children}</SideDrawer>;
};

export default MainLayout;
