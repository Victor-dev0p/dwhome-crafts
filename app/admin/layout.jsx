import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow">{children}</div>
    </div>
  );
}