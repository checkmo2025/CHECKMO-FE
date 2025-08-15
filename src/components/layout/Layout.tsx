import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";

export default function Layout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 bg-white">
        <Outlet />
      </main>
    </div>
  );
}
