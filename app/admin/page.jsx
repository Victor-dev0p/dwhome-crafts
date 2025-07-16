// app/admin/page.jsx
import { auth } from "@/auth";

const AdminDashboard = async () => {
  const session = await auth();
  console.log("Admin session:", session);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome Admin</h1>
      {session && session.user?.name ? (
        <p className="text-gray-700">You are logged in as: {session.user.name}</p>
      ) : (
        <p>You are not authorized</p>
      )}
    </main>
  );
};

export default AdminDashboard;