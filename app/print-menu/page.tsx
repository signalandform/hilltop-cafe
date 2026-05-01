import type { Metadata } from "next";
import { getCmsContent, getItemsForSection } from "@/lib/cms/queries";

export const metadata: Metadata = {
  title: "Print Menu",
};

export default async function PrintMenuPage() {
  const { settings, menuSections, menuItems } = await getCmsContent();

  return (
    <main className="print-menu">
      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">{settings.brandName}</p>
            <h1>Print Menu</h1>
            <p>
              {settings.address} · {settings.hours} · {settings.phone}
            </p>
          </div>
          {menuSections.map((section) => (
            <article className="card print-card" key={section.id}>
              <h2>{section.title}</h2>
              {section.description ? <p>{section.description}</p> : null}
              <ul className="price-list">
                {getItemsForSection(menuItems, section.id).map((item) => (
                  <li key={item.id}>
                    <span>{item.name}</span>
                    <span className="price">{item.price}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
