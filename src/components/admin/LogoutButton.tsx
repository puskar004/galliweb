"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-full border border-charcoal/20 px-5 py-2.5 text-sm font-semibold hover:bg-charcoal/5"
    >
      Log out
    </button>
  );
}
