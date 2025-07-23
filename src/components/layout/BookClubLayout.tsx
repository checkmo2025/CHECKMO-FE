import { Outlet } from "react-router-dom";
import ClubSideBar from "../ClubSideBar";

const BookClubLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <ClubSideBar />
      <div className="flex-1 overflow-y-auto bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default BookClubLayout;
