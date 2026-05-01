import type { Metadata } from "next";
import { deleteMenuItem, deleteMenuSection, saveMenuItem, saveMenuSection } from "@/lib/cms/actions";
import { getCmsContent, getItemsForSection } from "@/lib/cms/queries";

export const metadata: Metadata = {
  title: "Menu CMS",
};

export default async function AdminMenuPage() {
  const { menuSections, menuItems } = await getCmsContent({ includeDrafts: true });

  return (
    <section className="admin-panel">
      <div className="admin-page-head">
        <p className="eyebrow">CMS</p>
        <h1>Menu</h1>
        <p>Edit menu sections, board images, item details, prices, and availability.</p>
      </div>

      <div className="admin-card">
        <h2>Add Menu Section</h2>
        <form className="admin-form-grid" action={saveMenuSection}>
          <label>
            Slug
            <input name="slug" placeholder="coffee" required />
          </label>
          <label>
            Title
            <input name="title" placeholder="Coffee Bar" required />
          </label>
          <label>
            Board slug
            <input name="boardSlug" placeholder="coffee" />
          </label>
          <label>
            Sort order
            <input name="sortOrder" type="number" defaultValue={menuSections.length + 1} />
          </label>
          <label className="admin-full">
            Description
            <textarea name="description" />
          </label>
          <label>
            Image URL
            <input name="imageUrl" placeholder="/assets/menu/menu2.png" />
          </label>
          <label>
            Image alt text
            <input name="imageAlt" />
          </label>
          <label className="admin-checkbox">
            <input name="isPublished" type="checkbox" defaultChecked />
            Published
          </label>
          <div className="admin-actions admin-full">
            <button className="btn" type="submit">
              Add Section
            </button>
          </div>
        </form>
      </div>

      {menuSections.map((section) => (
        <div className="admin-card" key={section.id}>
          <h2>{section.title}</h2>
          <form className="admin-form-grid" action={saveMenuSection}>
            <input name="id" type="hidden" value={section.id} />
            <label>
              Slug
              <input name="slug" defaultValue={section.slug} required />
            </label>
            <label>
              Title
              <input name="title" defaultValue={section.title} required />
            </label>
            <label>
              Board slug
              <input name="boardSlug" defaultValue={section.boardSlug ?? ""} />
            </label>
            <label>
              Sort order
              <input name="sortOrder" type="number" defaultValue={section.sortOrder} />
            </label>
            <label className="admin-full">
              Description
              <textarea name="description" defaultValue={section.description ?? ""} />
            </label>
            <label>
              Image URL
              <input name="imageUrl" defaultValue={section.imageUrl ?? ""} />
            </label>
            <label>
              Image alt text
              <input name="imageAlt" defaultValue={section.imageAlt ?? ""} />
            </label>
            <label className="admin-checkbox">
              <input name="isPublished" type="checkbox" defaultChecked={section.isPublished} />
              Published
            </label>
            <div className="admin-actions admin-full">
              <button className="btn" type="submit">
                Save Section
              </button>
            </div>
          </form>
          <form action={deleteMenuSection}>
            <input name="id" type="hidden" value={section.id} />
            <button className="admin-danger" type="submit">
              Delete Section
            </button>
          </form>

          <div className="admin-nested">
            <h3>Items</h3>
            <form className="admin-form-grid" action={saveMenuItem}>
              <input name="sectionId" type="hidden" value={section.id} />
              <label>
                Name
                <input name="name" required />
              </label>
              <label>
                Price
                <input name="price" placeholder="$5.00" />
              </label>
              <label>
                Note
                <input name="note" placeholder="Featured" />
              </label>
              <label>
                Sort order
                <input name="sortOrder" type="number" defaultValue={getItemsForSection(menuItems, section.id).length + 1} />
              </label>
              <label className="admin-full">
                Description
                <textarea name="description" />
              </label>
              <label className="admin-checkbox">
                <input name="isAvailable" type="checkbox" defaultChecked />
                Available
              </label>
              <div className="admin-actions admin-full">
                <button className="btn btn-secondary" type="submit">
                  Add Item
                </button>
              </div>
            </form>

            {getItemsForSection(menuItems, section.id).map((item) => (
              <div className="admin-inline-card" key={item.id}>
                <form className="admin-form-grid" action={saveMenuItem}>
                  <input name="id" type="hidden" value={item.id} />
                  <input name="sectionId" type="hidden" value={section.id} />
                  <label>
                    Name
                    <input name="name" defaultValue={item.name} required />
                  </label>
                  <label>
                    Price
                    <input name="price" defaultValue={item.price ?? ""} />
                  </label>
                  <label>
                    Note
                    <input name="note" defaultValue={item.note ?? ""} />
                  </label>
                  <label>
                    Sort order
                    <input name="sortOrder" type="number" defaultValue={item.sortOrder} />
                  </label>
                  <label className="admin-full">
                    Description
                    <textarea name="description" defaultValue={item.description ?? ""} />
                  </label>
                  <label className="admin-checkbox">
                    <input name="isAvailable" type="checkbox" defaultChecked={item.isAvailable} />
                    Available
                  </label>
                  <div className="admin-actions admin-full">
                    <button className="btn btn-secondary" type="submit">
                      Save Item
                    </button>
                  </div>
                </form>
                <form action={deleteMenuItem}>
                  <input name="id" type="hidden" value={item.id} />
                  <button className="admin-danger" type="submit">
                    Delete Item
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
