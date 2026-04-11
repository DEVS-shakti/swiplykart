"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { getUserProfile } from "@/services/userService";
import { getProducts } from "@/services/productService";
import { aggregateClicksByProduct, getRecentClicks, type ClickRow } from "@/services/adminAnalyticsService";
import { removeProduct, saveProduct, type ProductDraft } from "@/services/adminProductService";
import { Product } from "@/types";

const emptyDraft: ProductDraft = {
  name: "",
  price: 0,
  category: "general",
  image: "",
  affiliateLink: "",
  description: "",
  shortDescription: "",
  vibes: [],
  tags: [],
  bullets: [],
  heroFeatured: false,
};

export function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<ProductDraft>(emptyDraft);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [clickRows, setClickRows] = useState<ClickRow[]>([]);
  const [clicksLoading, setClicksLoading] = useState(false);

  const loadClicks = useCallback(async () => {
    setClicksLoading(true);
    try {
      const rows = await getRecentClicks(50);
      setClickRows(rows);
    } catch {
      setClickRows([]);
    } finally {
      setClicksLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const { products: list } = await getProducts(80);
      setProducts(list);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setAllowed(false);
      return;
    }
    setAllowed(null);
    let cancelled = false;
    (async () => {
      const profile = await getUserProfile(user.uid);
      if (!cancelled) {
        setAllowed(profile?.role === "admin");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [authLoading, user]);

  useEffect(() => {
    if (allowed === true) void refresh();
  }, [allowed, refresh]);

  useEffect(() => {
    if (allowed === true) void loadClicks();
  }, [allowed, loadClicks]);

  function startNew() {
    setEditingId(null);
    setDraft(emptyDraft);
    setMessage(null);
  }

  function startEdit(p: Product) {
    setEditingId(p.id);
    setDraft({
      name: p.name,
      price: p.price,
      compareAtPrice: p.compareAtPrice,
      category: p.category,
      image: p.image,
      affiliateLink: p.affiliateLink || "",
      description: p.description,
      shortDescription: p.shortDescription,
      vibes: p.vibes || [],
      tags: p.tags || [],
      bullets: p.bullets || [],
      gallery: p.gallery,
      featuredLabel: p.featuredLabel,
      heroFeatured: p.heroFeatured === true,
      heroOrder: p.heroOrder,
    });
    setMessage(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.name.trim() || !draft.image.trim() || !draft.affiliateLink.trim()) {
      setMessage("Name, image URL, and affiliate link are required.");
      return;
    }
    setBusy(true);
    setMessage(null);
    try {
      const id = await saveProduct(editingId, draft);
      setMessage(`Saved product ${id}`);
      await refresh();
      setEditingId(id);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Save failed. Check Firestore rules and admin role.");
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete() {
    if (!editingId) return;
    if (!window.confirm("Delete this product permanently?")) return;
    setBusy(true);
    try {
      await removeProduct(editingId);
      setMessage("Deleted.");
      startNew();
      await refresh();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Delete failed.");
    } finally {
      setBusy(false);
    }
  }

  if (authLoading) {
    return <p className="text-faint-foreground">Checking access...</p>;
  }

  if (!user) {
    return (
      <div className="theme-panel rounded-3xl p-8 text-center">
        <p className="text-soft-foreground">Sign in to access admin tools.</p>
        <Link href="/auth/login" className={cn(buttonVariants({ className: "mt-4" }))}>
          Log in
        </Link>
      </div>
    );
  }

  if (user && allowed === null) {
    return <p className="text-faint-foreground">Verifying admin access...</p>;
  }

  if (user && allowed === false) {
    return (
      <div className="theme-panel rounded-3xl p-8">
        <p className="text-soft-foreground">
          This account is not an admin. Set <code className="text-primary">role: &quot;admin&quot;</code> on your user
          document in Firestore (<code className="text-tertiary">users/{user.uid}</code>).
        </p>
      </div>
    );
  }

  const trending = [...aggregateClicksByProduct(clickRows).entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);

  return (
    <>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <section className="theme-panel rounded-[28px] p-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="font-headline text-xl font-bold text-foreground">Catalog</h2>
            <Button type="button" size="sm" variant="secondary" onClick={startNew}>
              New product
            </Button>
          </div>
          {loading ? (
            <p className="text-sm text-faint-foreground">Loading...</p>
          ) : (
            <ul className="max-h-[520px] space-y-2 overflow-y-auto pr-1 text-sm">
              {products.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => startEdit(p)}
                    className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                      editingId === p.id
                        ? "border-primary/50 bg-primary/10"
                        : "border-outline/60 bg-surface-container-low/75 hover:border-primary/30"
                    }`}
                  >
                    <div className="line-clamp-1 font-semibold text-foreground">{p.name}</div>
                    <div className="text-xs text-faint-foreground">{p.category} · ${p.price}</div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="theme-panel rounded-[28px] p-6">
          <h2 className="font-headline text-xl font-bold text-foreground">{editingId ? "Edit product" : "Create product"}</h2>
          {message ? <p className="mt-3 text-sm text-tertiary">{message}</p> : null}
          <form className="mt-6 space-y-4" onSubmit={(e) => void handleSubmit(e)}>
            <label className="grid gap-1 text-xs text-faint-foreground">
              Name
              <Input value={draft.name} onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))} required />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1 text-xs text-faint-foreground">
                Price (USD)
                <Input
                  type="number"
                  step="0.01"
                  value={draft.price || ""}
                  onChange={(e) => setDraft((d) => ({ ...d, price: parseFloat(e.target.value) || 0 }))}
                  required
                />
              </label>
              <label className="grid gap-1 text-xs text-faint-foreground">
                Compare-at (optional)
                <Input
                  type="number"
                  step="0.01"
                  value={draft.compareAtPrice ?? ""}
                  onChange={(e) =>
                    setDraft((d) => ({
                      ...d,
                      compareAtPrice: e.target.value === "" ? undefined : parseFloat(e.target.value),
                    }))
                  }
                />
              </label>
            </div>
            <label className="grid gap-1 text-xs text-faint-foreground">
              Category
              <Input value={draft.category} onChange={(e) => setDraft((d) => ({ ...d, category: e.target.value }))} />
            </label>
            <label className="grid gap-1 text-xs text-faint-foreground">
              Image URL
              <Input value={draft.image} onChange={(e) => setDraft((d) => ({ ...d, image: e.target.value }))} required />
            </label>
            <label className="grid gap-1 text-xs text-faint-foreground">
              Affiliate link
              <Input
                value={draft.affiliateLink}
                onChange={(e) => setDraft((d) => ({ ...d, affiliateLink: e.target.value }))}
                required
              />
            </label>
            <label className="grid gap-1 text-xs text-faint-foreground">
              Short description
              <Input
                value={draft.shortDescription}
                onChange={(e) => setDraft((d) => ({ ...d, shortDescription: e.target.value }))}
              />
            </label>
            <label className="grid gap-1 text-xs text-faint-foreground">
              Description
              <textarea
                className="min-h-[100px] w-full rounded-xl border border-outline/60 bg-surface-container-low/80 px-3 py-2 text-sm text-foreground outline-none focus:border-primary/40"
                value={draft.description}
                onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
              />
            </label>
            <label className="grid gap-1 text-xs text-faint-foreground">
              Vibes (comma-separated)
              <Input
                value={draft.vibes.join(", ")}
                onChange={(e) =>
                  setDraft((d) => ({
                    ...d,
                    vibes: e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  }))
                }
              />
            </label>
            <label className="grid gap-1 text-xs text-faint-foreground">
              Tags (comma-separated)
              <Input
                value={draft.tags.join(", ")}
                onChange={(e) =>
                  setDraft((d) => ({
                    ...d,
                    tags: e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  }))
                }
              />
            </label>
            <label className="grid gap-1 text-xs text-faint-foreground">
              Bullets (comma-separated)
              <Input
                value={draft.bullets.join(", ")}
                onChange={(e) =>
                  setDraft((d) => ({
                    ...d,
                    bullets: e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  }))
                }
              />
            </label>
            <label className="grid gap-1 text-xs text-faint-foreground">
              Featured label
              <Input
                value={draft.featuredLabel || ""}
                onChange={(e) => setDraft((d) => ({ ...d, featuredLabel: e.target.value }))}
              />
            </label>
            <label className="rounded-xl border border-outline/60 bg-surface-container-low/75 px-4 py-3 text-sm text-soft-foreground">
              <span className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={draft.heroFeatured === true}
                  onChange={(e) => setDraft((d) => ({ ...d, heroFeatured: e.target.checked }))}
                  className="size-4 rounded border-outline accent-primary"
                />
                <span>Include in home hero carousel</span>
              </span>
            </label>
            <label className="grid gap-1 text-xs text-faint-foreground">
              Hero order (optional, lower appears first)
              <Input
                type="number"
                min={0}
                step={1}
                value={draft.heroOrder ?? ""}
                onChange={(e) => {
                  const v = e.target.value;
                  setDraft((d) => ({
                    ...d,
                    heroOrder: v === "" ? undefined : Number.parseInt(v, 10),
                  }));
                }}
                placeholder="0"
              />
            </label>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button type="submit" disabled={busy}>
                {busy ? "Saving..." : "Save to Firestore"}
              </Button>
              {editingId ? (
                <Button type="button" variant="secondary" disabled={busy} onClick={() => void handleDelete()}>
                  Delete
                </Button>
              ) : null}
            </div>
          </form>
        </section>
      </div>

      <section className="theme-panel mt-10 rounded-[28px] p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-headline text-xl font-bold text-foreground">Affiliate clicks</h2>
          <Button type="button" size="sm" variant="secondary" disabled={clicksLoading} onClick={() => void loadClicks()}>
            {clicksLoading ? "Loading..." : "Refresh"}
          </Button>
        </div>
        <p className="mb-4 text-xs text-faint-foreground">
          Recent &quot;Buy now&quot; events (newest first). Requires a Firestore composite index on{" "}
          <code className="text-tertiary">clicks.timestamp</code> if prompted in the console.
        </p>
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="mb-2 text-sm font-semibold text-soft-foreground">Trending product IDs</h3>
            {trending.length === 0 ? (
              <p className="text-sm text-faint-foreground">No clicks in the sampled window.</p>
            ) : (
              <ol className="space-y-2 text-sm">
                {trending.map(([pid, n]) => (
                  <li
                    key={pid}
                    className="flex justify-between gap-4 rounded-xl border border-outline/60 bg-surface-container-low/75 px-3 py-2"
                  >
                    <code className="truncate text-tertiary">{pid}</code>
                    <span className="shrink-0 font-bold text-primary">{n}x</span>
                  </li>
                ))}
              </ol>
            )}
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold text-soft-foreground">Latest events</h3>
            <ul className="max-h-64 space-y-2 overflow-y-auto text-xs text-faint-foreground">
              {clickRows.slice(0, 15).map((row) => (
                <li key={row.id} className="rounded-lg border border-outline/50 bg-surface-container-low/70 px-2 py-1.5 font-mono">
                  <span className="text-foreground">{row.productId}</span>
                  {row.userId ? <span className="text-tertiary"> · {row.userId.slice(0, 8)}...</span> : null}
                  {row.at ? <div className="text-faint-foreground">{row.at}</div> : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
