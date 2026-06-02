import type { Pages } from "../../types";
import Sidebar from "./SideBar";

interface LayoutProps {
  children: React.ReactNode;
  activeTab: Pages;
  setActiveTab: (tab: Pages) => void;
}
const Layout = ({ children, activeTab, setActiveTab }: LayoutProps) => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  );
};

export default Layout;
