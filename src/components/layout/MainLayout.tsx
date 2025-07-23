import { Outlet } from "react-router-dom";
import MainSideBar from "../MainSideBar";

const MainLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <MainSideBar />
      <div className="flex-1 overflow-y-auto bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
