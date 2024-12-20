"use client";
import AdminSidebar from "@/components/adminSidebar";
import { useUser } from "@/provider/AuthContent";

export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useUser();

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className=" bg-white border-r">
        <div className="space-y-4 flex flex-col">
          <AdminSidebar />
        </div>
      </aside>
      <div className="container bg-[#f5f5f5] mx-auto p-6 space-y-6 overflow-y-auto h-screen">
      {children}
      </div>
    </div>
  );
}
