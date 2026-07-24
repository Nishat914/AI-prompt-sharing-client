
import DashboardSidebar from "@/component/dashboard/DashboardSidebar";

export default function RootLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#EFE4D7]">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-[#E2D5C8] shadow-sm">
        <div className="flex items-center justify-center h-16 border-b border-[#E2D5C8]">
          <h1 className="text-xl font-bold text-[#3D2C24]">
            Dashboard
          </h1>
        </div>

        {/* Navigation Menu */}
        <DashboardSidebar />
      </aside>

      {/* Main Content Area */}
      <div className="ml-64">
        

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}