"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { ShopFormValues } from "@/components/admin/ShopForm";

type Props = {
  onGenerated: (draft: ShopFormValues) => void;
};

/**
 * "Describe the shop, we'll fill the form" box shown above the manual
 * ShopForm on the New Shop page. Generation only pre-fills text fields —
 * photos, address, and everything else stay fully editable afterward.
 */
export function PromptGenerator({ onGenerated }: Props) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGenerate() {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/generate-shop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Couldn't generate details. Try filling the form manually.");
        return;
      }

      onGenerated({
        ...data.draft,
        mapEmbedUrl: "", // never AI-generated — added manually if needed
      });
    } catch {
      setError("Could not reach the server. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mb-8 rounded-2xl border border-teal/30 bg-teal/5 p-6">
      <h2 className="mb-1.5 font-display text-lg font-semibold">Describe the shop</h2>
      <p className="mb-4 text-sm text-slate">
        Write a sentence or two — we'll fill in the form below. You can edit anything
        (including photos, phone, and address) before or after saving.
      </p>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g. Sharma General Store, a kirana shop in Kankarbagh open since 1998, sells groceries and daily essentials"
        className="mb-3 min-h-[90px] w-full rounded-lg border border-charcoal/15 px-3.5 py-2.5 text-sm outline-none focus:border-teal focus:ring-1 focus:ring-teal"
      />

      {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

      <Button type="button" onClick={handleGenerate} loading={loading} disabled={!prompt.trim()}>
        ✨ Generate shop details
      </Button>
    </div>
  );
}
