"use client";

import { useState } from "react";
import Link from "next/link";
import { ShopForm, type ShopFormValues } from "@/components/admin/ShopForm";
import { PromptGenerator } from "@/components/admin/PromptGenerator";

export default function NewShopPage() {
  // Storing the generated draft here (instead of inside ShopForm) lets us
  // force ShopForm to re-initialize with new values by changing its `key`
  // below — otherwise a form that already mounted with empty defaults
  // wouldn't pick up freshly generated text.
  const [draft, setDraft] = useState<ShopFormValues | null>(null);

  return (
    <main className="min-h-screen bg-[#F7F6F2] px-6 py-10">
      <div className="mx-auto max-w-2xl">
        <Link href="/admin/dashboard" className="mb-6 inline-block text-sm text-slate hover:underline">
          ← Back to shops
        </Link>
        <h1 className="mb-1 font-display text-2xl font-semibold">New shop</h1>
        <p className="mb-8 text-sm text-slate">
          Describe the shop and let AI fill the form, or just fill it in yourself.
          You'll add photos on the next screen either way.
        </p>

        <PromptGenerator onGenerated={setDraft} />

        <div className="rounded-2xl border border-charcoal/10 bg-white p-7">
          <ShopForm key={draft ? JSON.stringify(draft) : "empty"} initialValues={draft ?? undefined} />
        </div>
      </div>
    </main>
  );
}
