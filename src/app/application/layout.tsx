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
      {children}
    </div>
  ): <div>Loading.....</div>;
}
