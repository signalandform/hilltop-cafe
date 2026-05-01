"use client";

import { useState } from "react";
import Link from "next/link";
import type { SiteSettings } from "@/lib/cms/types";

export function SiteHeader({ settings }: { settings: SiteSettings }) {
  const [open, setOpen] = useState(false);

  function closeNav() {
    setOpen(false);
  }

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link className="brand" href="/" onClick={closeNav}>
          <img
            className="brand-logo"
            src="/assets/logo-primary.png"
            alt={`${settings.brandName} logo`}
            width="56"
            height="56"
          />
          <div className="brand-stack">
            <span className="brand-text">{settings.brandName}</span>
            <span className="brand-tagline">{settings.tagline}</span>
          </div>
        </Link>
        <button
          className="nav-toggle"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        >
          &#9776;
        </button>
        <nav className={`site-nav${open ? " open" : ""}`} aria-label="Main navigation">
          <Link href="/menu" onClick={closeNav}>
            Menu
          </Link>
          <Link href="/#story" onClick={closeNav}>
            Story
          </Link>
          <Link href="/#visit" onClick={closeNav}>
            Visit
          </Link>
          <a
            className="btn btn-nav"
            href={settings.orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeNav}
          >
            Order Online
          </a>
        </nav>
      </div>
    </header>
  );
}
