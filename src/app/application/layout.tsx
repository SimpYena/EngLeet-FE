"use client";
import Sidebar from "@/components/sidebar";
import { useUser } from "@/provider/AuthContent";

export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useUser();

  return user ? (
    <div className="flex h-screen bg-gray-50">
      <aside className=" bg-white border-r">
        <div className="space-y-4 flex flex-col">
          <Sidebar />
        </div>
      </aside>
      <div className="container mx-auto p-6 max-w-[1024px] space-y-6 overflow-y-auto h-screen">
      {children}
      </div>
    </div>
  ): <div>Loading.....</div>;
}
