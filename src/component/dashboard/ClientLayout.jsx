"use client";

import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { GiRobotHelmet } from "react-icons/gi";
import DashboardSidebar from "@/component/dashboard/DashboardSidebar";
import DashboardUser from "@/component/dashboard/DashboardUser";

export default function ClientLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#EFE4D7]">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#E2D5C8] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-[#EFE4D7] transition-colors"
            aria-label="Toggle menu"
          >
            {isSidebarOpen ? (
              <HiX className="text-2xl text-[#3D2C24]" />
            ) : (
              <HiMenu className="text-2xl text-[#3D2C24]" />
            )}
          </button>
          <div className="flex items-center gap-2">
            <GiRobotHelmet className="text-2xl text-[#C86B43]" />
            <span className="text-xl font-bold text-[#3D2C24]">
              AI-<span className="text-[#C86B43]">PSMP</span>
            </span>
          </div>
        </div>
        <DashboardUser />
      </header>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 
          w-72 sm:w-80 
          bg-white border-r border-[#E2D5C8] shadow-sm
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:w-75
        `}
      >
        {/* Sidebar Header with Close Button */}
        <div className="flex items-center justify-between px-4 h-16 lg:h-20 border-b border-[#E2D5C8]">
          {/* Logo - Visible on all devices */}
          <div className="flex items-center gap-2">
            <GiRobotHelmet className="text-2xl lg:text-3xl text-[#C86B43]" />
            <span className="text-xl lg:text-3xl font-bold text-[#3D2C24]">
              AI-<span className="text-[#C86B43]">PSMP</span>
            </span>
          </div>

          {/* Close Button - Only visible on mobile */}
          <button
            onClick={closeSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-[#EFE4D7] transition-colors"
            aria-label="Close sidebar"
          >
            <HiX className="text-2xl text-[#3D2C24]" />
          </button>

          {/* User - Only visible on desktop */}
          <div className="hidden lg:block">
            <DashboardUser />
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="h-full overflow-y-auto pt-4 lg:pt-0 pb-20">
          <DashboardSidebar closeSidebar={closeSidebar} />
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="lg:ml-75 mt-16 lg:mt-0">
        <main className="p-4 sm:p-6 md:p-8 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}