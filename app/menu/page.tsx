import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCmsContent, getItemsForSection } from "@/lib/cms/queries";

export const metadata: Metadata = {
  title: "Menu",
  description: "Coffee bar, matcha lab, specialty drinks, and pastry case at Hilltop Coffee Shop.",
};

export default async function MenuPage() {
  const { settings, menuSections, menuItems } = await getCmsContent();

  return (
    <>
      <SiteHeader settings={settings} />
      <main>
        <section className="section hero menu-hero">
          <div className="container menu-hero-grid">
            <div>
              <p className="eyebrow">Hilltop Menu Boards</p>
              <h1 className="menu-page-title">Coffee, Matcha, Specialty Drinks &amp; Pastry</h1>
              <div className="menu-board-links">
                {menuSections.map((section, index) => (
                  <a
                    className={`btn${index === 0 ? " btn-neon" : " btn-secondary"}`}
                    href={`/menu-board/${section.boardSlug ?? section.slug}`}
                    target="_blank"
                    rel="noopener"
                    key={section.id}
                  >
                    {section.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section menu-gallery">
          <div className="container">
            <div className="menu-board-grid menu-board-grid-images">
              {menuSections.map((section) => (
                <article className="menu-board-card menu-board-card-image" id={section.slug} key={section.id}>
                  <a href={`/menu-board/${section.boardSlug ?? section.slug}`} target="_blank" rel="noopener">
                    {section.imageUrl ? (
                      <img src={section.imageUrl} alt={section.imageAlt ?? section.title} loading="lazy" />
                    ) : null}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section pattern-panel">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">Browse Details</p>
              <h2>CMS Menu Items</h2>
            </div>
            {menuSections.map((section) => {
              const items = getItemsForSection(menuItems, section.id);
              return (
                <div className="cms-menu-section" key={section.id}>
                  <div className="section-head">
                    <h2>{section.title}</h2>
                    {section.description ? <p>{section.description}</p> : null}
                  </div>
                  <div className="menu-grid">
                    {items.map((item) => (
                      <article className="menu-item" key={item.id}>
                        <h3>{item.name}</h3>
                        {item.description ? <p>{item.description}</p> : null}
                        {item.price ? <span>{item.price}</span> : null}
                      </article>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <SiteFooter settings={settings} />
    </>
  );
}
