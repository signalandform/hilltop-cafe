import { requireAdmin } from "@/lib/auth/admin";
import { signOut } from "@/lib/cms/actions";
import Link from "next/link";

const adminLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/settings", label: "Settings" },
  { href: "/admin/menu", label: "Menu" },
  { href: "/admin/promos", label: "Promos" },
  { href: "/admin/gallery", label: "Gallery" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link className="brand admin-brand" href="/admin">
          <img className="brand-logo" src="/assets/logo-primary.png" alt="Hilltop Coffee Shop logo" width="48" height="48" />
          <div className="brand-stack">
            <span className="brand-text">Hilltop CMS</span>
            <span className="brand-tagline">Admin</span>
          </div>
        </Link>
        <nav className="admin-nav" aria-label="Admin navigation">
          {adminLinks.map((link) => (
            <Link href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <form action={signOut}>
          <button className="btn btn-secondary admin-logout" type="submit">
            Sign Out
          </button>
        </form>
        {admin.email ? <p className="admin-user">{admin.email}</p> : null}
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
