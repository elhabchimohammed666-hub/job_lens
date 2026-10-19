import { Outlet } from "react-router-dom";
import ManagerSidebar from "./ManagerSidebar";

export default function ManagerLayout() {
  return (
    <div className="min-h-screen bg-[#F2F4F7] text-on-surface antialiased flex">
      <ManagerSidebar />
      <main className="flex-1 md:ml-[280px] p-margin-mobile md:p-margin-desktop">
        <div className="max-w-container-max mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
