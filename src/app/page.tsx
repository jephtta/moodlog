"use client";

import { useAuth } from "@/lib/auth-context";
import { AuthForm } from "@/components/auth-form";
import { Dashboard } from "@/components/dashboard";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!user) return <AuthForm />;
  return <Dashboard />;
}
