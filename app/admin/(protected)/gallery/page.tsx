import type { Metadata } from "next";
import { deleteGalleryItem, saveGalleryItem } from "@/lib/cms/actions";
import { getCmsContent } from "@/lib/cms/queries";

export const metadata: Metadata = {
  title: "Gallery CMS",
};

export default async function AdminGalleryPage() {
  const { galleryItems } = await getCmsContent({ includeDrafts: true });

  return (
    <section className="admin-panel">
      <div className="admin-page-head">
        <p className="eyebrow">CMS</p>
        <h1>Gallery</h1>
        <p>Edit hero gallery slides, captions, and accessibility text.</p>
      </div>

      <div className="admin-card">
        <h2>Add Gallery Item</h2>
        <GalleryForm />
      </div>

      {galleryItems.map((item) => (
        <div className="admin-card" key={item.id}>
          <h2>{item.caption}</h2>
          <GalleryForm item={item} />
          <form action={deleteGalleryItem}>
            <input name="id" type="hidden" value={item.id} />
            <button className="admin-danger" type="submit">
              Delete Gallery Item
            </button>
          </form>
        </div>
      ))}
    </section>
  );
}

type GalleryFormProps = {
  item?: {
    id: string;
    imageUrl: string;
    altText: string;
    caption: string;
    sortOrder: number;
    isPublished: boolean;
  };
};

function GalleryForm({ item }: GalleryFormProps) {
  return (
    <form className="admin-form-grid" action={saveGalleryItem}>
      {item ? <input name="id" type="hidden" value={item.id} /> : null}
      <label>
        Image URL
        <input name="imageUrl" defaultValue={item?.imageUrl ?? ""} placeholder="/assets/promo/example.png" required />
      </label>
      <label>
        Caption
        <input name="caption" defaultValue={item?.caption ?? ""} required />
      </label>
      <label>
        Alt text
        <input name="altText" defaultValue={item?.altText ?? ""} required />
      </label>
      <label>
        Sort order
        <input name="sortOrder" type="number" defaultValue={item?.sortOrder ?? 1} />
      </label>
      <label className="admin-checkbox">
        <input name="isPublished" type="checkbox" defaultChecked={item?.isPublished ?? true} />
        Published
      </label>
      <div className="admin-actions admin-full">
        <button className="btn" type="submit">
          {item ? "Save Gallery Item" : "Add Gallery Item"}
        </button>
      </div>
    </form>
  );
}
