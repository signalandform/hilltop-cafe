"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function optionalValue(formData: FormData, key: string) {
  const nextValue = value(formData, key);
  return nextValue.length ? nextValue : null;
}

function numberValue(formData: FormData, key: string) {
  const parsed = Number(value(formData, key));
  return Number.isFinite(parsed) ? parsed : 0;
}

function booleanValue(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

function refreshCms() {
  revalidatePath("/");
  revalidatePath("/menu");
  revalidatePath("/print-menu");
  revalidatePath("/menu-board/[board]", "page");
  revalidatePath("/admin", "layout");
}

export async function signInWithPassword(formData: FormData) {
  if (!hasSupabaseEnv()) {
    redirect("/admin/login?error=missing-env");
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: value(formData, "email"),
    password: value(formData, "password"),
  });

  if (error) {
    redirect(`/admin/login?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/admin");
}

export async function sendMagicLink(formData: FormData) {
  if (!hasSupabaseEnv()) {
    redirect("/admin/login?error=missing-env");
  }

  const origin = (await headers()).get("origin") ?? "";
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithOtp({
    email: value(formData, "email"),
    options: {
      emailRedirectTo: `${origin}/auth/callback?next=/admin`,
    },
  });

  if (error) {
    redirect(`/admin/login?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/admin/login?message=check-email");
}

export async function signOut() {
  if (hasSupabaseEnv()) {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  }
  redirect("/admin/login");
}

export async function saveSiteSettings(formData: FormData) {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();

  await supabase.from("site_settings").upsert({
    id: "site",
    brand_name: value(formData, "brandName"),
    tagline: value(formData, "tagline"),
    hero_eyebrow: value(formData, "heroEyebrow"),
    hero_title: value(formData, "heroTitle"),
    hero_body: value(formData, "heroBody"),
    story_title: value(formData, "storyTitle"),
    story_body: value(formData, "storyBody")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean),
    story_quote: value(formData, "storyQuote"),
    address: value(formData, "address"),
    hours: value(formData, "hours"),
    phone: value(formData, "phone"),
    order_url: value(formData, "orderUrl"),
    contact_eyebrow: value(formData, "contactEyebrow"),
    contact_title: value(formData, "contactTitle"),
    contact_body: value(formData, "contactBody"),
  });

  refreshCms();
  redirect("/admin/settings?saved=1");
}

export async function saveMenuSection(formData: FormData) {
  await requireAdmin();
  const id = optionalValue(formData, "id");
  const supabase = await createSupabaseServerClient();
  const payload = {
    slug: value(formData, "slug"),
    title: value(formData, "title"),
    description: optionalValue(formData, "description"),
    image_url: optionalValue(formData, "imageUrl"),
    image_alt: optionalValue(formData, "imageAlt"),
    board_slug: optionalValue(formData, "boardSlug"),
    sort_order: numberValue(formData, "sortOrder"),
    is_published: booleanValue(formData, "isPublished"),
  };

  if (id) {
    await supabase.from("menu_sections").update(payload).eq("id", id);
  } else {
    await supabase.from("menu_sections").insert(payload);
  }

  refreshCms();
  redirect("/admin/menu?saved=1");
}

export async function deleteMenuSection(formData: FormData) {
  await requireAdmin();
  const id = value(formData, "id");
  const supabase = await createSupabaseServerClient();
  await supabase.from("menu_sections").delete().eq("id", id);
  refreshCms();
  redirect("/admin/menu?deleted=1");
}

export async function saveMenuItem(formData: FormData) {
  await requireAdmin();
  const id = optionalValue(formData, "id");
  const supabase = await createSupabaseServerClient();
  const payload = {
    section_id: value(formData, "sectionId"),
    name: value(formData, "name"),
    description: optionalValue(formData, "description"),
    price: optionalValue(formData, "price"),
    note: optionalValue(formData, "note"),
    sort_order: numberValue(formData, "sortOrder"),
    is_available: booleanValue(formData, "isAvailable"),
  };

  if (id) {
    await supabase.from("menu_items").update(payload).eq("id", id);
  } else {
    await supabase.from("menu_items").insert(payload);
  }

  refreshCms();
  redirect("/admin/menu?saved=1");
}

export async function deleteMenuItem(formData: FormData) {
  await requireAdmin();
  const id = value(formData, "id");
  const supabase = await createSupabaseServerClient();
  await supabase.from("menu_items").delete().eq("id", id);
  refreshCms();
  redirect("/admin/menu?deleted=1");
}

export async function savePromo(formData: FormData) {
  await requireAdmin();
  const id = optionalValue(formData, "id");
  const supabase = await createSupabaseServerClient();
  const payload = {
    title: value(formData, "title"),
    subtitle: optionalValue(formData, "subtitle"),
    description: value(formData, "description"),
    image_url: value(formData, "imageUrl"),
    image_alt: value(formData, "imageAlt"),
    sort_order: numberValue(formData, "sortOrder"),
    is_published: booleanValue(formData, "isPublished"),
  };

  if (id) {
    await supabase.from("promos").update(payload).eq("id", id);
  } else {
    await supabase.from("promos").insert(payload);
  }

  refreshCms();
  redirect("/admin/promos?saved=1");
}

export async function deletePromo(formData: FormData) {
  await requireAdmin();
  const id = value(formData, "id");
  const supabase = await createSupabaseServerClient();
  await supabase.from("promos").delete().eq("id", id);
  refreshCms();
  redirect("/admin/promos?deleted=1");
}

export async function saveGalleryItem(formData: FormData) {
  await requireAdmin();
  const id = optionalValue(formData, "id");
  const supabase = await createSupabaseServerClient();
  const payload = {
    image_url: value(formData, "imageUrl"),
    alt_text: value(formData, "altText"),
    caption: value(formData, "caption"),
    sort_order: numberValue(formData, "sortOrder"),
    is_published: booleanValue(formData, "isPublished"),
  };

  if (id) {
    await supabase.from("gallery_items").update(payload).eq("id", id);
  } else {
    await supabase.from("gallery_items").insert(payload);
  }

  refreshCms();
  redirect("/admin/gallery?saved=1");
}

export async function deleteGalleryItem(formData: FormData) {
  await requireAdmin();
  const id = value(formData, "id");
  const supabase = await createSupabaseServerClient();
  await supabase.from("gallery_items").delete().eq("id", id);
  refreshCms();
  redirect("/admin/gallery?deleted=1");
}
