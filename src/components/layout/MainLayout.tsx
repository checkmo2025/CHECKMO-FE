import { Outlet } from "react-router-dom";
import MainSidebar from "../MainSideBar";

const MainLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <MainSidebar />
      <div className="flex-1 overflow-y-auto bg-white p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
