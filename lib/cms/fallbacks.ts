import type { CmsContent, GalleryItem, MenuItem, MenuSection, Promo, SiteSettings } from "./types";

export const fallbackSettings: SiteSettings = {
  id: "site",
  brandName: "Hilltop Coffee Shop",
  tagline: "Baked Goods & Coffee",
  heroEyebrow: "Northlake, TX - Since 2026",
  heroTitle: "Slow pours, sweet bakes, and a corner of Northlake that feels like yours.",
  heroBody:
    "Hilltop is a neighborhood coffee shop serving oat-milk matcha, small-batch espresso drinks, and pastries pulled fresh from the oven each morning. Order ahead, pull up a seat, and stay a while.",
  storyTitle: "Coffee done right - on the hill.",
  storyBody: [
    "At Hilltop Coffee Shop, we believe coffee should still taste like coffee, just a really good one. We knew we could do better, so we did.",
    "On the hill, we focus on smooth, balanced coffee paired with flavors that actually make sense. Our goal is simple: give our community something to wake up excited for every day.",
    "Because existing is hard. Finding good coffee should not be.",
  ],
  storyQuote: "Welcome to coffee done right - on the hill.",
  address: "8356 Thompson Road, Northlake, TX 76247",
  hours: "Daily: 5:30 AM - 5:30 PM",
  phone: "469-432-5090",
  orderUrl: "https://order.spoton.com/BL-27AA-FCDA-BFD7",
  contactEyebrow: "Pickup & Delivery",
  contactTitle: "Ready when you are.",
  contactBody:
    "Order ahead for curbside pickup or let us deliver straight to your door. Fresh bakes, hot espresso, and oat-milk matcha any time of day.",
};

export const fallbackMenuSections: MenuSection[] = [
  {
    id: "coffee",
    slug: "coffee",
    title: "Coffee & Brilliance Boost",
    description: "Espresso bar, refreshers, kid drinks, and caffeine alternatives.",
    imageUrl: "/assets/menu/menu2.png",
    imageAlt: "Coffee and brilliance boost menu preview",
    boardSlug: "coffee",
    sortOrder: 1,
    isPublished: true,
  },
  {
    id: "matcha",
    slug: "matcha",
    title: "Matcha + Specialty Lab",
    description: "Oat-milk matcha drinks and specialty lattes.",
    imageUrl: "/assets/menu/menu1.png",
    imageAlt: "Specialty drinks and matcha menu preview",
    boardSlug: "matcha",
    sortOrder: 2,
    isPublished: true,
  },
  {
    id: "pastries",
    slug: "pastries",
    title: "Pastry Case",
    description: "Croissants, kolaches, scones, muffins, cookies, and daily bakes.",
    imageUrl: "/assets/menu/menu3.png",
    imageAlt: "Pastry case menu board preview",
    boardSlug: "pastries",
    sortOrder: 3,
    isPublished: true,
  },
];

export const fallbackMenuItems: MenuItem[] = [
  {
    id: "banana-bread-latte",
    sectionId: "matcha",
    name: "Banana Bread Latte",
    description: "Espresso layered with house banana pudding syrup, oat milk, and banana cold foam.",
    price: null,
    note: "Featured",
    sortOrder: 1,
    isAvailable: true,
  },
  {
    id: "strawberry-cloud-matcha",
    sectionId: "matcha",
    name: "Strawberry Cloud Matcha",
    description: "Ceremonial oat-milk matcha under a homemade strawberry cold foam.",
    price: "$8.99",
    note: "Featured",
    sortOrder: 2,
    isAvailable: true,
  },
  {
    id: "lavender-honey-latte",
    sectionId: "matcha",
    name: "Lavender Honey Latte",
    description: "Espresso with homemade lavender syrup, steamed oat milk, and lavender cold foam.",
    price: null,
    note: "Featured",
    sortOrder: 3,
    isAvailable: true,
  },
  {
    id: "espresso",
    sectionId: "coffee",
    name: "Espresso",
    description: "Dark roast espresso served smooth and balanced.",
    price: "$3.50",
    note: null,
    sortOrder: 1,
    isAvailable: true,
  },
  {
    id: "yumberry-red",
    sectionId: "coffee",
    name: "Yumberry Red Brilliance Boost",
    description: "Caffeine alternative with bright fruit flavor.",
    price: "$5.00",
    note: null,
    sortOrder: 2,
    isAvailable: true,
  },
  {
    id: "almond-croissant",
    sectionId: "pastries",
    name: "Almond Croissant",
    description: "Twice-baked with almond cream and pulled fresh from the oven.",
    price: null,
    note: "Featured",
    sortOrder: 1,
    isAvailable: true,
  },
  {
    id: "spinach-quiche",
    sectionId: "pastries",
    name: "Spinach Quiche",
    description: "Savory breakfast favorite baked fresh in small batches.",
    price: "$5.00",
    note: null,
    sortOrder: 2,
    isAvailable: true,
  },
];

export const fallbackPromos: Promo[] = [
  {
    id: "hilltop-handle",
    title: "Hilltop Handle, 32oz quad shot",
    subtitle: null,
    description:
      "Big bucket energy: four shots of espresso over ice, topped the Hilltop way. Stop in while we are pouring it.",
    imageUrl: "/assets/promo/hilltop-handle.png",
    imageAlt: "Hilltop Handle iced coffee in a clear bucket cup",
    sortOrder: 1,
    isPublished: true,
  },
  {
    id: "hilltop-half-half",
    title: "Hilltop Half & Half, 32 oz, 16 oz / side",
    subtitle: "Featuring the banana bread latte and banana bread matcha",
    description:
      "Two drinks, one cup, split down the middle so you do not have to choose. Ask for it on your next visit.",
    imageUrl: "/assets/promo/hilltop-half-half.png",
    imageAlt: "Hilltop Half and Half split cup with matcha and latte",
    sortOrder: 2,
    isPublished: true,
  },
];

export const fallbackGalleryItems: GalleryItem[] = [
  {
    id: "gallery-handle",
    imageUrl: "/assets/promo/hilltop-handle.png",
    altText: "Hilltop Handle iced coffee",
    caption: "Hilltop Handle",
    sortOrder: 1,
    isPublished: true,
  },
  {
    id: "gallery-half-half",
    imageUrl: "/assets/promo/hilltop-half-half.png",
    altText: "Split cup matcha and latte",
    caption: "Hilltop Half & Half",
    sortOrder: 2,
    isPublished: true,
  },
  {
    id: "gallery-menu",
    imageUrl: "/assets/menu/menu1.png",
    altText: "Matcha and specialty menu board",
    caption: "Matcha + Specialty Lab",
    sortOrder: 3,
    isPublished: true,
  },
];

export const fallbackContent: CmsContent = {
  settings: fallbackSettings,
  menuSections: fallbackMenuSections,
  menuItems: fallbackMenuItems,
  promos: fallbackPromos,
  galleryItems: fallbackGalleryItems,
};
