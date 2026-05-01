import type { Metadata } from "next";
import { deletePromo, savePromo } from "@/lib/cms/actions";
import { getCmsContent } from "@/lib/cms/queries";

export const metadata: Metadata = {
  title: "Promo CMS",
};

export default async function AdminPromosPage() {
  const { promos } = await getCmsContent({ includeDrafts: true });

  return (
    <section className="admin-panel">
      <div className="admin-page-head">
        <p className="eyebrow">CMS</p>
        <h1>Promos</h1>
        <p>Edit the featured cards on the home page.</p>
      </div>

      <div className="admin-card">
        <h2>Add Promo</h2>
        <PromoForm />
      </div>

      {promos.map((promo) => (
        <div className="admin-card" key={promo.id}>
          <h2>{promo.title}</h2>
          <PromoForm promo={promo} />
          <form action={deletePromo}>
            <input name="id" type="hidden" value={promo.id} />
            <button className="admin-danger" type="submit">
              Delete Promo
            </button>
          </form>
        </div>
      ))}
    </section>
  );
}

type PromoFormProps = {
  promo?: {
    id: string;
    title: string;
    subtitle: string | null;
    description: string;
    imageUrl: string;
    imageAlt: string;
    sortOrder: number;
    isPublished: boolean;
  };
};

function PromoForm({ promo }: PromoFormProps) {
  return (
    <form className="admin-form-grid" action={savePromo}>
      {promo ? <input name="id" type="hidden" value={promo.id} /> : null}
      <label>
        Title
        <input name="title" defaultValue={promo?.title ?? ""} required />
      </label>
      <label>
        Subtitle
        <input name="subtitle" defaultValue={promo?.subtitle ?? ""} />
      </label>
      <label>
        Image URL
        <input name="imageUrl" defaultValue={promo?.imageUrl ?? ""} placeholder="/assets/promo/example.png" required />
      </label>
      <label>
        Image alt text
        <input name="imageAlt" defaultValue={promo?.imageAlt ?? ""} required />
      </label>
      <label>
        Sort order
        <input name="sortOrder" type="number" defaultValue={promo?.sortOrder ?? 1} />
      </label>
      <label className="admin-checkbox">
        <input name="isPublished" type="checkbox" defaultChecked={promo?.isPublished ?? true} />
        Published
      </label>
      <label className="admin-full">
        Description
        <textarea name="description" defaultValue={promo?.description ?? ""} required />
      </label>
      <div className="admin-actions admin-full">
        <button className="btn" type="submit">
          {promo ? "Save Promo" : "Add Promo"}
        </button>
      </div>
    </form>
  );
}
