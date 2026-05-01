import { HeroGallery } from "@/components/hero-gallery";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCmsContent, getItemsForSection } from "@/lib/cms/queries";

export default async function HomePage() {
  const content = await getCmsContent();
  const { settings, menuSections, menuItems, promos, galleryItems } = content;
  const featuredItems = menuItems.filter((item) => item.note?.toLowerCase() === "featured").slice(0, 4);

  return (
    <>
      <SiteHeader settings={settings} />
      <main id="home">
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">{settings.heroEyebrow}</p>
              <h1>{settings.heroTitle}</h1>
              <p>{settings.heroBody}</p>
              <div className="hero-actions">
                <a className="btn" href="/menu">
                  See Full Menu
                </a>
                <a className="btn btn-secondary" href="#visit">
                  Plan Your Visit
                </a>
              </div>
            </div>
            <aside className="hero-media">
              <HeroGallery items={galleryItems} />
            </aside>
          </div>
        </section>

        <section className="section promo-spotlight" id="spotlight" aria-labelledby="spotlight-heading">
          <div className="container">
            <div className="section-head">
              <h2 id="spotlight-heading">Featured right now</h2>
            </div>
            <div className="promo-spotlight-grid">
              {promos.map((promo) => (
                <figure className="promo-spotlight-card" key={promo.id}>
                  <div className="promo-spotlight-media">
                    <img src={promo.imageUrl} alt={promo.imageAlt} width="800" height="1000" loading="lazy" />
                  </div>
                  <figcaption className="promo-spotlight-caption">
                    <h3>{promo.title}</h3>
                    {promo.subtitle ? <p className="promo-spotlight-sub">{promo.subtitle}</p> : null}
                    <p className="promo-spotlight-announce">{promo.description}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="section menu-preview" id="menu">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">Now Pouring</p>
            </div>
            <div className="menu-preview-grid">
              {menuSections.map((section) => (
                <a className="menu-preview-card" href={`/menu#${section.slug}`} key={section.id}>
                  {section.imageUrl ? (
                    <img src={section.imageUrl} alt={section.imageAlt ?? section.title} loading="lazy" />
                  ) : null}
                  <div>
                    <h3>{section.title}</h3>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="section pattern-panel">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">Featured this month</p>
            </div>
            <div className="menu-grid">
              {featuredItems.map((item) => (
                <article className="menu-item" key={item.id}>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
              {!featuredItems.length
                ? menuSections.flatMap((section) =>
                    getItemsForSection(menuItems, section.id)
                      .slice(0, 2)
                      .map((item) => (
                        <article className="menu-item" key={item.id}>
                          <h3>{item.name}</h3>
                          <p>{item.description}</p>
                        </article>
                      )),
                  )
                : null}
            </div>
          </div>
        </section>

        <section id="story" className="section story">
          <div className="container story-grid">
            <div>
              <p className="eyebrow">Our Story</p>
              <h2>{settings.storyTitle}</h2>
              {settings.storyBody.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <div className="story-bits">
                <div>
                  <span className="caption">Beans</span>
                  <strong className="story-bit-line">Dark roast from Italy</strong>
                </div>
                <div>
                  <span className="caption">Bakes</span>
                  <strong className="story-bit-line">Fresh baked daily</strong>
                </div>
                <div>
                  <span className="caption">Community</span>
                  <strong className="story-bit-line">Family owned &amp; operated</strong>
                </div>
              </div>
            </div>
            <blockquote>
              {settings.storyQuote}
              <span className="blockquote-note">
                Our in-house baker prepares scratch-made baked goods daily, from sweet pastries to savory breakfast
                favorites like quiche and kolaches. Made with real ingredients in small batches.
              </span>
            </blockquote>
          </div>
        </section>

        <section id="visit" className="section visit">
          <div className="container visit-grid">
            <div>
              <p className="eyebrow">Visit</p>
              <h2>Hours &amp; Location</h2>
              <ul className="details-list">
                <li>
                  <strong>Address:</strong> {settings.address}
                </li>
                <li>
                  <strong>Hours:</strong> {settings.hours}
                </li>
                <li>
                  <strong>Phone:</strong> <a href={`tel:+1${settings.phone.replace(/\D/g, "")}`}>{settings.phone}</a>
                </li>
              </ul>
            </div>
            <div className="visit-note">
              <h3>While You Are Here</h3>
              <ul className="perks-list">
                <li>Free street parking out front</li>
                <li>Free Wi-Fi for every table</li>
                <li>Dog-friendly patio</li>
                <li>Drive-thru open</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="contact" className="section cta">
          <div className="container cta-wrap">
            <div>
              <p className="eyebrow">{settings.contactEyebrow}</p>
              <h2>{settings.contactTitle}</h2>
              <p>{settings.contactBody}</p>
            </div>
            <div className="cta-actions">
              <a className="btn" href={settings.orderUrl} target="_blank" rel="noopener noreferrer">
                Order Online
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter settings={settings} />
    </>
  );
}
