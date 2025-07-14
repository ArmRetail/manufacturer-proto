import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 min-h-screen bg-[#F3F4F6]">
      {/* Sidebar */}
      <div className=" flex-1 h-screen fixed left-0 top-0 z-30">
        <AdminSidebar />
      </div>
      {/* Main area (header + content) */}
      <div className="flex flex-col flex-1 ml-64 min-h-screen">
        <div className="sticky top-0 z-40 w-full">
          <AdminHeader />
        </div>
        <main className="flex-1  overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
