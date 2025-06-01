"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth_context";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-6 row-start-2 items-center text-center">
        <h1 className="text-3xl font-semibold text-foreground">Welcome to easy-saga 👋</h1>
        <p className="text-zinc-500 max-w-xl text-base">
          This is your centralized dashboard for managing distributed saga workflows across systems.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <a
            href="/systems"
            className="rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-6 py-2 transition-all"
          >
            View Systems
          </a>
          <a
            href="/sagas"
            className="rounded-md border border-zinc-700 hover:bg-zinc-900 text-sm text-white font-medium px-6 py-2 transition-all"
          >
            Go to Saga Designer
          </a>
        </div>
      </main>

      <footer className="row-start-3 text-sm text-zinc-600 text-center">
        © {new Date().getFullYear()} easy-saga • All rights reserved
      </footer>
    </div>
  );
}
