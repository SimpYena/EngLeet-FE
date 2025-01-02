"use client";
import Sidebar from "@/components/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useUser } from "@/provider/AuthContent";

export default function ApplicationLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const user = useUser();

  return user ? (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-50 w-full">
        <Sidebar />
        <SidebarTrigger className="m-3"/>
        <div className="flex-1 h-screen overflow-y-auto">
          <div className="container mx-auto max-w-[1240px] space-y-6">
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  ) : (
    <div>Loading.....</div>
  );
}
