import { unstable_noStore as noStore } from "next/cache";
import { fallbackContent, fallbackSettings } from "./fallbacks";
import type { CmsContent, GalleryItem, MenuItem, MenuSection, Promo, SiteSettings } from "./types";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type SiteSettingsRow = {
  id: string;
  brand_name: string;
  tagline: string;
  hero_eyebrow: string;
  hero_title: string;
  hero_body: string;
  story_title: string;
  story_body: string[] | null;
  story_quote: string;
  address: string;
  hours: string;
  phone: string;
  order_url: string;
  contact_eyebrow: string;
  contact_title: string;
  contact_body: string;
};

type MenuSectionRow = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  image_url: string | null;
  image_alt: string | null;
  board_slug: string | null;
  sort_order: number;
  is_published: boolean;
};

type MenuItemRow = {
  id: string;
  section_id: string;
  name: string;
  description: string | null;
  price: string | null;
  note: string | null;
  sort_order: number;
  is_available: boolean;
};

type PromoRow = {
  id: string;
  title: string;
  subtitle: string | null;
  description: string;
  image_url: string;
  image_alt: string;
  sort_order: number;
  is_published: boolean;
};

type GalleryItemRow = {
  id: string;
  image_url: string;
  alt_text: string;
  caption: string;
  sort_order: number;
  is_published: boolean;
};

function mapSettings(row: SiteSettingsRow | null): SiteSettings {
  if (!row) return fallbackSettings;
  return {
    id: row.id,
    brandName: row.brand_name,
    tagline: row.tagline,
    heroEyebrow: row.hero_eyebrow,
    heroTitle: row.hero_title,
    heroBody: row.hero_body,
    storyTitle: row.story_title,
    storyBody: row.story_body?.length ? row.story_body : fallbackSettings.storyBody,
    storyQuote: row.story_quote,
    address: row.address,
    hours: row.hours,
    phone: row.phone,
    orderUrl: row.order_url,
    contactEyebrow: row.contact_eyebrow,
    contactTitle: row.contact_title,
    contactBody: row.contact_body,
  };
}

function mapSection(row: MenuSectionRow): MenuSection {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    imageUrl: row.image_url,
    imageAlt: row.image_alt,
    boardSlug: row.board_slug,
    sortOrder: row.sort_order,
    isPublished: row.is_published,
  };
}

function mapMenuItem(row: MenuItemRow): MenuItem {
  return {
    id: row.id,
    sectionId: row.section_id,
    name: row.name,
    description: row.description,
    price: row.price,
    note: row.note,
    sortOrder: row.sort_order,
    isAvailable: row.is_available,
  };
}

function mapPromo(row: PromoRow): Promo {
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    description: row.description,
    imageUrl: row.image_url,
    imageAlt: row.image_alt,
    sortOrder: row.sort_order,
    isPublished: row.is_published,
  };
}

function mapGalleryItem(row: GalleryItemRow): GalleryItem {
  return {
    id: row.id,
    imageUrl: row.image_url,
    altText: row.alt_text,
    caption: row.caption,
    sortOrder: row.sort_order,
    isPublished: row.is_published,
  };
}

export async function getCmsContent(options: { includeDrafts?: boolean } = {}): Promise<CmsContent> {
  noStore();

  if (!hasSupabaseEnv()) {
    return fallbackContent;
  }

  try {
    const supabase = await createSupabaseServerClient();
    const publishedFilter = options.includeDrafts ? undefined : true;

    const [
      settingsResult,
      sectionsResult,
      itemsResult,
      promosResult,
      galleryResult,
    ] = await Promise.all([
      supabase.from("site_settings").select("*").eq("id", "site").maybeSingle<SiteSettingsRow>(),
      supabase
        .from("menu_sections")
        .select("*")
        .order("sort_order", { ascending: true })
        .returns<MenuSectionRow[]>(),
      supabase
        .from("menu_items")
        .select("*")
        .order("sort_order", { ascending: true })
        .returns<MenuItemRow[]>(),
      supabase
        .from("promos")
        .select("*")
        .order("sort_order", { ascending: true })
        .returns<PromoRow[]>(),
      supabase
        .from("gallery_items")
        .select("*")
        .order("sort_order", { ascending: true })
        .returns<GalleryItemRow[]>(),
    ]);

    if (
      settingsResult.error ||
      sectionsResult.error ||
      itemsResult.error ||
      promosResult.error ||
      galleryResult.error
    ) {
      return fallbackContent;
    }

    const menuSections = (sectionsResult.data ?? [])
      .filter((section) => publishedFilter === undefined || section.is_published === publishedFilter)
      .map(mapSection);
    const sectionIds = new Set(menuSections.map((section) => section.id));

    return {
      settings: mapSettings(settingsResult.data),
      menuSections,
      menuItems: (itemsResult.data ?? [])
        .filter((item) => sectionIds.has(item.section_id))
        .filter((item) => options.includeDrafts || item.is_available)
        .map(mapMenuItem),
      promos: (promosResult.data ?? [])
        .filter((promo) => publishedFilter === undefined || promo.is_published === publishedFilter)
        .map(mapPromo),
      galleryItems: (galleryResult.data ?? [])
        .filter((item) => publishedFilter === undefined || item.is_published === publishedFilter)
        .map(mapGalleryItem),
    };
  } catch {
    return fallbackContent;
  }
}

export function getItemsForSection(items: MenuItem[], sectionId: string) {
  return items
    .filter((item) => item.sectionId === sectionId)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}
