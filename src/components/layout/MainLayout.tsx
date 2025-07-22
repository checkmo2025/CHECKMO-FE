import { Outlet } from "react-router-dom";
import MainSidebar from "../MainSideBar";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen ">
      <MainSidebar />
      <div className="flex-1 bg-white p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
