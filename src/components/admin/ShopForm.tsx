"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

export type ShopFormValues = {
  name: string;
  category: string;
  templateType: "RETAIL" | "RESTAURANT" | "BOUTIQUE";
  tagline: string;
  description: string;
  phone: string;
  whatsapp: string;
  address: string;
  mapEmbedUrl: string;
};

const emptyValues: ShopFormValues = {
  name: "",
  category: "",
  templateType: "RETAIL",
  tagline: "",
  description: "",
  phone: "",
  whatsapp: "",
  address: "",
  mapEmbedUrl: "",
};

type Props = {
  /** Pass an existing shop's values + id to edit it; omit to create a new one. */
  shopId?: string;
  initialValues?: ShopFormValues;
};

export function ShopForm({ shopId, initialValues }: Props) {
  const router = useRouter();
  const isEditing = Boolean(shopId);

  const [values, setValues] = useState<ShopFormValues>(initialValues ?? emptyValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  function update<K extends keyof ShopFormValues>(key: K, value: ShopFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      const url = isEditing ? `/api/shops/${shopId}` : "/api/shops";
      const method = isEditing ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrors({ _form: data.error ?? "Something went wrong" });
        return;
      }

      if (isEditing) {
        router.refresh();
      } else {
        // New shop created — move straight to its edit page to add photos.
        router.push(`/admin/dashboard/edit/${data.shop.id}`);
      }
    } catch {
      setErrors({ _form: "Could not reach the server. Try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field
          label="Shop name"
          required
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
        />
        <Field
          label="Category"
          placeholder="e.g. Kirana & General Store"
          required
          value={values.category}
          onChange={(e) => update("category", e.target.value)}
        />
      </div>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-charcoal">Template</span>
        <select
          value={values.templateType}
          onChange={(e) => update("templateType", e.target.value as ShopFormValues["templateType"])}
          className="w-full rounded-lg border border-charcoal/15 px-3.5 py-2.5 text-sm outline-none focus:border-teal focus:ring-1 focus:ring-teal"
        >
          <option value="RETAIL">Retail / General store</option>
          <option value="RESTAURANT">Restaurant / Café</option>
          <option value="BOUTIQUE">Boutique / Fashion</option>
        </select>
      </label>

      <Field
        label="Tagline"
        placeholder="A short line under the shop name"
        required
        value={values.tagline}
        onChange={(e) => update("tagline", e.target.value)}
      />

      <Field
        as="textarea"
        label="About the shop"
        placeholder="What the shop sells, how long it's been around, what makes it worth visiting..."
        required
        value={values.description}
        onChange={(e) => update("description", e.target.value)}
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field
          label="Phone number"
          required
          value={values.phone}
          onChange={(e) => update("phone", e.target.value)}
        />
        <Field
          label="WhatsApp number (optional)"
          value={values.whatsapp}
          onChange={(e) => update("whatsapp", e.target.value)}
        />
      </div>

      <Field
        label="Address"
        required
        value={values.address}
        onChange={(e) => update("address", e.target.value)}
      />

      <Field
        label="Google Maps embed URL (optional)"
        placeholder="Share > Embed a map, then paste the src=... link here"
        value={values.mapEmbedUrl}
        onChange={(e) => update("mapEmbedUrl", e.target.value)}
      />

      {errors._form && <p className="text-sm text-red-600">{errors._form}</p>}

      <Button type="submit" loading={loading}>
        {isEditing ? "Save changes" : "Create shop & continue to photos"}
      </Button>
    </form>
  );
}
