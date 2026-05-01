import type { SiteSettings } from "@/lib/cms/types";

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="site-footer">
      <div className="container footer-wrap">
        <div className="footer-left">
          <img src="/assets/logo-primary.png" alt={`${settings.brandName} logo`} className="footer-logo" />
          <p>
            © {new Date().getFullYear()} {settings.brandName} · Northlake, TX
          </p>
        </div>
        <div className="footer-links">
          <a
            className="footer-brand-tag"
            href="https://signalandform.net/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Website by Signal and Form"
          >
            <img
              className="footer-brand-logo"
              src="/assets/signalandform-logo.png"
              alt=""
              width="22"
              height="22"
              loading="lazy"
            />
            <span>Site by Signal &amp; Form</span>
          </a>
          <a className="back-to-top" href="#home">
            Back to top
            <span className="back-to-top-arrow" aria-hidden="true">
              ↑
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
