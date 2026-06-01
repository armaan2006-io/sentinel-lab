import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { ShieldCheck, Package, Star, ArrowUpRight, Search, ShoppingBag } from "lucide-react";
import { CURRENT_SESSION_USER_ID, products, reviews, type User } from "@/lib/mock-db";
import { getUserById } from "@/lib/user.functions";
import { GMAPS_API_KEY } from "@/lib/insecure-config";

export const Route = createFileRoute("/")({
  validateSearch: (s: Record<string, unknown>): { id?: string } => ({
    id: typeof s.id === "string" ? s.id : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Aperture — Member Portal" },
      { name: "description", content: "Premium goods, curated for members of Aperture." },
    ],
  }),
  component: Portal,
});

function Portal() {
  const nav = useNavigate();
  const search = Route.useSearch() as { id?: string };
  // ⚠️ User id read straight from the URL — BOLA surface.
  const viewId = search.id ?? CURRENT_SESSION_USER_ID;

  const fetchUser = useServerFn(getUserById);
  const [user, setUser] = useState<User | null>(null);
  const [bioDraft, setBioDraft] = useState("");

  useEffect(() => {
    fetchUser({ data: { id: viewId } }).then((u) => {
      setUser(u);
      if (u) setBioDraft(u.bioHtml);
    });
  }, [viewId, fetchUser]);

  return (
    <div className="min-h-screen" style={{ background: "var(--gradient-hero)" }}>
      <Header />

      <main className="mx-auto max-w-6xl px-6 pb-24 pt-10">
        {/* Hero */}
        <section className="mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <span className="size-1.5 rounded-full bg-primary" /> Members-only · Fall '26 drop live
          </span>
          <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-[1.05] md:text-6xl">
            The portal for considered goods,<br />
            <span className="text-primary">crafted to outlast trends.</span>
          </h1>
          <p className="mt-5 max-w-xl text-muted-foreground">
            Manage your orders, profile, and curated picks — all in one place.
          </p>
        </section>

        {/* Stats */}
        <section className="mb-16 grid grid-cols-2 gap-3 md:grid-cols-4">
          <Stat label="Lifetime spend" value={user ? `$${user.ordersTotal.toLocaleString()}` : "—"} />
          <Stat label="Tier" value={user?.role === "admin" ? "Admin" : "Member"} />
          <Stat label="Joined" value={user?.joined ?? "—"} />
          <Stat label="Open orders" value="2" />
        </section>

        {/* Profile card */}
        <section className="mb-16 rounded-2xl border border-border bg-card p-8">
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Viewing profile</p>
              <h2 className="mt-1 text-2xl font-semibold">{user?.name ?? "Loading…"}</h2>
              <p className="text-sm text-muted-foreground">{user?.email}</p>

              <div className="mt-6">
                <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">Bio</p>
                {/*
                  ⚠️ VULNERABLE-BY-DESIGN — XSS sink.
                  Bio is rendered as raw HTML; <script> in the input will execute.
                */}
                <div
                  className="rounded-lg border border-border bg-background/40 p-4 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: user?.bioHtml ?? "" }}
                />
                <textarea
                  className="mt-3 w-full rounded-lg border border-border bg-input/40 p-3 text-sm font-mono"
                  rows={3}
                  value={bioDraft}
                  onChange={(e) => setBioDraft(e.target.value)}
                  placeholder="<b>Try</b> pasting <script>alert(1)</script>"
                />
                <button
                  onClick={() => user && setUser({ ...user, bioHtml: bioDraft })}
                  className="mt-3 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                >
                  Save bio
                </button>
              </div>
            </div>

            {/* BOLA switcher */}
            <div className="w-64 shrink-0 rounded-xl border border-border bg-background/40 p-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Switch viewing id</p>
              <p className="mt-1 text-xs text-muted-foreground/70">
                Try 1001, 1002, 1003 — no auth check.
              </p>
              <div className="mt-3 flex gap-2">
                {["1001", "1002", "1003"].map((id) => (
                  <button
                    key={id}
                    onClick={() => nav({ to: "/", search: { id } })}
                    className={`flex-1 rounded-md border border-border px-2 py-1.5 text-xs transition ${
                      viewId === id ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                    }`}
                  >
                    {id}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="mb-16">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl font-semibold">Curated for you</h2>
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
              View all <ArrowUpRight className="ml-0.5 inline size-3" />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {products.map((p) => (
              <article
                key={p.id}
                className="group rounded-xl border border-border bg-card p-5 transition hover:border-primary/50"
              >
                <div className="mb-4 aspect-[4/5] rounded-lg bg-gradient-to-br from-secondary to-muted" />
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{p.category}</p>
                <h3 className="mt-1 text-base font-medium">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-semibold">${p.price}</span>
                  <button className="rounded-md bg-secondary px-3 py-1.5 text-xs transition group-hover:bg-primary group-hover:text-primary-foreground">
                    Add to bag
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Reviews — also XSS sink */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-semibold">Member reviews</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {reviews.map((r) => (
              <div key={r.id} className="rounded-xl border border-border bg-card p-5">
                <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <Star className="size-3 fill-primary text-primary" /> {r.author} · {r.product}
                </div>
                {/* ⚠️ Same XSS sink for review bodies */}
                <p
                  className="text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: r.bodyHtml }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Map footer using hardcoded key */}
        <section className="rounded-2xl border border-border bg-card p-6 text-xs text-muted-foreground">
          <p>
            Flagship store map powered by Google Maps (key:{" "}
            <code className="rounded bg-background/60 px-1.5 py-0.5 text-[10px]">
              {GMAPS_API_KEY.slice(0, 12)}…
            </code>
            ). See <code>src/lib/insecure-config.ts</code>.
          </p>
        </section>
      </main>
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="grid size-7 place-items-center rounded-md bg-primary text-primary-foreground">
            <ShieldCheck className="size-4" />
          </div>
          <span className="font-display text-base font-semibold tracking-tight">Aperture</span>
          <span className="ml-2 rounded-full bg-destructive/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-destructive">
            Training Lab
          </span>
        </div>
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <a className="hover:text-foreground" href="#">Shop</a>
          <a className="hover:text-foreground" href="#">Orders</a>
          <a className="hover:text-foreground" href="#">Profile</a>
          <a className="hover:text-foreground" href="#">Support</a>
        </nav>
        <div className="flex items-center gap-2">
          <button className="grid size-9 place-items-center rounded-md border border-border hover:bg-secondary">
            <Search className="size-4" />
          </button>
          <button className="flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">
            <ShoppingBag className="size-4" /> Bag
          </button>
        </div>
      </div>
    </header>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card/60 p-5">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-2xl font-semibold">{value}</p>
    </div>
  );
}
