import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCmsContent } from "@/lib/cms/queries";

type PageProps = {
  params: Promise<{
    board: string;
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { board } = await params;
  const { menuSections } = await getCmsContent();
  const section = menuSections.find((item) => item.boardSlug === board || item.slug === board);

  return {
    title: section ? `${section.title} Board` : "Menu Board",
  };
}

export default async function MenuBoardPage({ params }: PageProps) {
  const { board } = await params;
  const { menuSections } = await getCmsContent();
  const section = menuSections.find((item) => item.boardSlug === board || item.slug === board);

  if (!section) {
    notFound();
  }

  return (
    <main className="menu-board board-image">
      <header className="board-mini-header">
        <div className="container board-mini-wrap">
          <Link className="brand" href="/">
            <img className="brand-logo" src="/assets/logo-primary.png" alt="Hilltop Coffee Shop logo" width="40" height="40" />
            <span className="brand-text">Hilltop</span>
          </Link>
          <a className="board-back-link" href={`/menu#${section.slug}`}>
            &larr; Back to Menu
          </a>
        </div>
      </header>
      <section className="board-shell board-shell-image">
        <figure className="board-figure">
          {section.imageUrl ? <img src={section.imageUrl} alt={section.imageAlt ?? section.title} /> : null}
        </figure>
      </section>
    </main>
  );
}
