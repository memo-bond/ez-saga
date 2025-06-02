"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/auth_context";

export const dynamic = "force-static";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      login("fake-jwt-token"); // store a mock token
      router.push("/menu/systems");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-6"
      >
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-zinc-900">Easy Saga Admin</h1>
          <p className="text-sm text-zinc-500">Please login to manage your saga systems 😄</p>
        </div>

        <div>
          <label className="block text-sm mb-1 text-zinc-700">Username</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-zinc-700">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="btn-primary w-full py-2 bg-zinc-900 text-white rounded-md hover:bg-zinc-800 transition"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
