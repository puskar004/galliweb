import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ShopList } from "@/components/admin/ShopList";
import { LogoutButton } from "@/components/admin/LogoutButton";

// Server component: runs on the server, so it can query Prisma directly
// instead of calling its own API route. Middleware has already confirmed
// the visitor is logged in before this page is ever rendered.
export default async function DashboardPage() {
  const shops = await prisma.shop.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-[#F7F6F2] px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-semibold">Shops</h1>
            <p className="text-sm text-slate">
              {shops.length} shop{shops.length === 1 ? "" : "s"} generated so far
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin/dashboard/new"
              className="rounded-full bg-marigold px-5 py-2.5 text-sm font-semibold text-ink hover:bg-marigold-dim"
            >
              + New shop
            </Link>
            <LogoutButton />
          </div>
        </div>

        <ShopList
          shops={shops.map((s: (typeof shops)[number]) => ({
            ...s,
            createdAt: s.createdAt.toISOString(),
          }))}
        />
      </div>
    </main>
  );
}
