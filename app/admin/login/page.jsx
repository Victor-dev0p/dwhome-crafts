// app/admin/login/page.jsx
"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AdminLoginPage = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      ...form,
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow max-w-sm w-full"
      >
        <h1 className="text-xl font-bold mb-4 text-center">Admin Login</h1>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          value={form.username}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={form.password}
          className="w-full mb-3 p-2 border rounded"
        />
        <button className="w-full bg-green-800 text-white p-2 rounded hover:bg-green-700">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default AdminLoginPage;