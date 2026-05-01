import type { Metadata } from "next";
import { getCmsContent } from "@/lib/cms/queries";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default async function AdminDashboardPage() {
  const { menuSections, menuItems, promos, galleryItems } = await getCmsContent({ includeDrafts: true });

  return (
    <section className="admin-panel">
      <div className="admin-page-head">
        <p className="eyebrow">Content Management</p>
        <h1>Dashboard</h1>
        <p>Manage the content that powers the public Hilltop Coffee Shop site.</p>
      </div>

      <div className="admin-stat-grid">
        <a className="admin-stat-card" href="/admin/menu">
          <span>{menuSections.length}</span>
          <strong>Menu sections</strong>
        </a>
        <a className="admin-stat-card" href="/admin/menu">
          <span>{menuItems.length}</span>
          <strong>Menu items</strong>
        </a>
        <a className="admin-stat-card" href="/admin/promos">
          <span>{promos.length}</span>
          <strong>Promos</strong>
        </a>
        <a className="admin-stat-card" href="/admin/gallery">
          <span>{galleryItems.length}</span>
          <strong>Gallery slides</strong>
        </a>
      </div>
    </section>
  );
}
