"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Shop = {
  id: string;
  name: string;
  slug: string;
  category: string;
  published: boolean;
  createdAt: string;
};

export function ShopList({ shops }: { shops: Shop[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This removes its website and photos permanently.`)) return;
    setDeletingId(id);
    await fetch(`/api/shops/${id}`, { method: "DELETE" });
    router.refresh();
    setDeletingId(null);
  }

  if (shops.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-charcoal/20 p-10 text-center text-sm text-slate">
        No shops yet. Click &quot;+ New shop&quot; to build the first one.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-charcoal/10">
      <table className="w-full text-left text-sm">
        <thead className="bg-charcoal/[0.03] text-xs uppercase tracking-wide text-slate">
          <tr>
            <th className="px-4 py-3">Shop</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-charcoal/10">
          {shops.map((shop) => (
            <tr key={shop.id}>
              <td className="px-4 py-3 font-medium">{shop.name}</td>
              <td className="px-4 py-3 text-slate">{shop.category}</td>
              <td className="px-4 py-3">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    shop.published
                      ? "bg-teal/10 text-teal-deep"
                      : "bg-slate/10 text-slate"
                  }`}
                >
                  {shop.published ? "Live" : "Unpublished"}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-3">
                  <Link href={`/site/${shop.slug}`} target="_blank" className="text-teal-deep hover:underline">
                    View
                  </Link>
                  <Link href={`/admin/dashboard/edit/${shop.id}`} className="text-charcoal hover:underline">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(shop.id, shop.name)}
                    disabled={deletingId === shop.id}
                    className="text-red-600 hover:underline disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
