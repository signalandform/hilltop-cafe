export type SiteSettings = {
  id: string;
  brandName: string;
  tagline: string;
  heroEyebrow: string;
  heroTitle: string;
  heroBody: string;
  storyTitle: string;
  storyBody: string[];
  storyQuote: string;
  address: string;
  hours: string;
  phone: string;
  orderUrl: string;
  contactEyebrow: string;
  contactTitle: string;
  contactBody: string;
};

export type MenuSection = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  imageAlt: string | null;
  boardSlug: string | null;
  sortOrder: number;
  isPublished: boolean;
};

export type MenuItem = {
  id: string;
  sectionId: string;
  name: string;
  description: string | null;
  price: string | null;
  note: string | null;
  sortOrder: number;
  isAvailable: boolean;
};

export type Promo = {
  id: string;
  title: string;
  subtitle: string | null;
  description: string;
  imageUrl: string;
  imageAlt: string;
  sortOrder: number;
  isPublished: boolean;
};

export type GalleryItem = {
  id: string;
  imageUrl: string;
  altText: string;
  caption: string;
  sortOrder: number;
  isPublished: boolean;
};

export type CmsContent = {
  settings: SiteSettings;
  menuSections: MenuSection[];
  menuItems: MenuItem[];
  promos: Promo[];
  galleryItems: GalleryItem[];
};
