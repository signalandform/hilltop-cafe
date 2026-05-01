create extension if not exists pgcrypto with schema extensions;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.admin_users (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users(id) on delete cascade,
  email text unique,
  created_at timestamptz not null default now()
);

alter table public.admin_users
  add constraint admin_users_has_identifier check (user_id is not null or email is not null);

create table public.site_settings (
  id text primary key default 'site',
  brand_name text not null,
  tagline text not null,
  hero_eyebrow text not null,
  hero_title text not null,
  hero_body text not null,
  story_title text not null,
  story_body text[] not null default '{}',
  story_quote text not null,
  address text not null,
  hours text not null,
  phone text not null,
  order_url text not null,
  contact_eyebrow text not null,
  contact_title text not null,
  contact_body text not null,
  updated_at timestamptz not null default now()
);

create table public.menu_sections (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  image_url text,
  image_alt text,
  board_slug text unique,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.menu_items (
  id uuid primary key default gen_random_uuid(),
  section_id uuid not null references public.menu_sections(id) on delete cascade,
  name text not null,
  description text,
  price text,
  note text,
  sort_order integer not null default 0,
  is_available boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index menu_items_section_sort_idx on public.menu_items(section_id, sort_order);

create table public.promos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  description text not null,
  image_url text not null,
  image_alt text not null,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  alt_text text not null,
  caption text not null,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_site_settings_updated_at
before update on public.site_settings
for each row execute function public.set_updated_at();

create trigger set_menu_sections_updated_at
before update on public.menu_sections
for each row execute function public.set_updated_at();

create trigger set_menu_items_updated_at
before update on public.menu_items
for each row execute function public.set_updated_at();

create trigger set_promos_updated_at
before update on public.promos
for each row execute function public.set_updated_at();

create trigger set_gallery_items_updated_at
before update on public.gallery_items
for each row execute function public.set_updated_at();

alter table public.admin_users enable row level security;
alter table public.site_settings enable row level security;
alter table public.menu_sections enable row level security;
alter table public.menu_items enable row level security;
alter table public.promos enable row level security;
alter table public.gallery_items enable row level security;

create policy "Admins can read their own allowlist row"
on public.admin_users
for select
to authenticated
using (
  user_id = auth.uid()
  or lower(email) = lower(auth.jwt() ->> 'email')
);

create policy "Anyone can read site settings"
on public.site_settings
for select
to anon, authenticated
using (true);

create policy "Admins can write site settings"
on public.site_settings
for all
to authenticated
using (exists (select 1 from public.admin_users where user_id = auth.uid() or lower(email) = lower(auth.jwt() ->> 'email')))
with check (exists (select 1 from public.admin_users where user_id = auth.uid() or lower(email) = lower(auth.jwt() ->> 'email')));

create policy "Anyone can read published menu sections"
on public.menu_sections
for select
to anon, authenticated
using (
  is_published
  or exists (select 1 from public.admin_users where user_id = auth.uid() or lower(email) = lower(auth.jwt() ->> 'email'))
);

create policy "Admins can write menu sections"
on public.menu_sections
for all
to authenticated
using (exists (select 1 from public.admin_users where user_id = auth.uid() or lower(email) = lower(auth.jwt() ->> 'email')))
with check (exists (select 1 from public.admin_users where user_id = auth.uid() or lower(email) = lower(auth.jwt() ->> 'email')));

create policy "Anyone can read available published menu items"
on public.menu_items
for select
to anon, authenticated
using (
  (
    is_available
    and exists (
      select 1
      from public.menu_sections
      where menu_sections.id = menu_items.section_id
        and menu_sections.is_published
    )
  )
  or exists (select 1 from public.admin_users where user_id = auth.uid() or lower(email) = lower(auth.jwt() ->> 'email'))
);

create policy "Admins can write menu items"
on public.menu_items
for all
to authenticated
using (exists (select 1 from public.admin_users where user_id = auth.uid() or lower(email) = lower(auth.jwt() ->> 'email')))
with check (exists (select 1 from public.admin_users where user_id = auth.uid() or lower(email) = lower(auth.jwt() ->> 'email')));

create policy "Anyone can read published promos"
on public.promos
for select
to anon, authenticated
using (
  is_published
  or exists (select 1 from public.admin_users where user_id = auth.uid() or lower(email) = lower(auth.jwt() ->> 'email'))
);

create policy "Admins can write promos"
on public.promos
for all
to authenticated
using (exists (select 1 from public.admin_users where user_id = auth.uid() or lower(email) = lower(auth.jwt() ->> 'email')))
with check (exists (select 1 from public.admin_users where user_id = auth.uid() or lower(email) = lower(auth.jwt() ->> 'email')));

create policy "Anyone can read published gallery items"
on public.gallery_items
for select
to anon, authenticated
using (
  is_published
  or exists (select 1 from public.admin_users where user_id = auth.uid() or lower(email) = lower(auth.jwt() ->> 'email'))
);

create policy "Admins can write gallery items"
on public.gallery_items
for all
to authenticated
using (exists (select 1 from public.admin_users where user_id = auth.uid() or lower(email) = lower(auth.jwt() ->> 'email')))
with check (exists (select 1 from public.admin_users where user_id = auth.uid() or lower(email) = lower(auth.jwt() ->> 'email')));

insert into public.admin_users (email)
values ('jack@signalandform.net');

insert into public.site_settings (
  id,
  brand_name,
  tagline,
  hero_eyebrow,
  hero_title,
  hero_body,
  story_title,
  story_body,
  story_quote,
  address,
  hours,
  phone,
  order_url,
  contact_eyebrow,
  contact_title,
  contact_body
)
values (
  'site',
  'Hilltop Coffee Shop',
  'Baked Goods & Coffee',
  'Northlake, TX - Since 2026',
  'Slow pours, sweet bakes, and a corner of Northlake that feels like yours.',
  'Hilltop is a neighborhood coffee shop serving oat-milk matcha, small-batch espresso drinks, and pastries pulled fresh from the oven each morning. Order ahead, pull up a seat, and stay a while.',
  'Coffee done right - on the hill.',
  array[
    'At Hilltop Coffee Shop, we believe coffee should still taste like coffee, just a really good one. We knew we could do better, so we did.',
    'On the hill, we focus on smooth, balanced coffee paired with flavors that actually make sense. Our goal is simple: give our community something to wake up excited for every day.',
    'Because existing is hard. Finding good coffee should not be.'
  ],
  'Welcome to coffee done right - on the hill.',
  '8356 Thompson Road, Northlake, TX 76247',
  'Daily: 5:30 AM - 5:30 PM',
  '469-432-5090',
  'https://order.spoton.com/BL-27AA-FCDA-BFD7',
  'Pickup & Delivery',
  'Ready when you are.',
  'Order ahead for curbside pickup or let us deliver straight to your door. Fresh bakes, hot espresso, and oat-milk matcha any time of day.'
);

with inserted_sections as (
  insert into public.menu_sections (slug, title, description, image_url, image_alt, board_slug, sort_order, is_published)
  values
    ('coffee', 'Coffee & Brilliance Boost', 'Espresso bar, refreshers, kid drinks, and caffeine alternatives.', '/assets/menu/menu2.png', 'Coffee and brilliance boost menu preview', 'coffee', 1, true),
    ('matcha', 'Matcha + Specialty Lab', 'Oat-milk matcha drinks and specialty lattes.', '/assets/menu/menu1.png', 'Specialty drinks and matcha menu preview', 'matcha', 2, true),
    ('pastries', 'Pastry Case', 'Croissants, kolaches, scones, muffins, cookies, and daily bakes.', '/assets/menu/menu3.png', 'Pastry case menu board preview', 'pastries', 3, true)
  returning id, slug
)
insert into public.menu_items (section_id, name, description, price, note, sort_order, is_available)
select id, name, description, price, note, sort_order, true
from inserted_sections
cross join lateral (
  values
    ('coffee', 'Espresso', 'Dark roast espresso served smooth and balanced.', '$3.50', null, 1),
    ('coffee', 'Yumberry Red Brilliance Boost', 'Caffeine alternative with bright fruit flavor.', '$5.00', null, 2),
    ('matcha', 'Banana Bread Latte', 'Espresso layered with house banana pudding syrup, oat milk, and banana cold foam.', null, 'Featured', 1),
    ('matcha', 'Strawberry Cloud Matcha', 'Ceremonial oat-milk matcha under a homemade strawberry cold foam.', '$8.99', 'Featured', 2),
    ('matcha', 'Lavender Honey Latte', 'Espresso with homemade lavender syrup, steamed oat milk, and lavender cold foam.', null, 'Featured', 3),
    ('pastries', 'Almond Croissant', 'Twice-baked with almond cream and pulled fresh from the oven.', null, 'Featured', 1),
    ('pastries', 'Spinach Quiche', 'Savory breakfast favorite baked fresh in small batches.', '$5.00', null, 2)
) as seed(section_slug, name, description, price, note, sort_order)
where inserted_sections.slug = seed.section_slug;

insert into public.promos (title, subtitle, description, image_url, image_alt, sort_order, is_published)
values
  (
    'Hilltop Handle, 32oz quad shot',
    null,
    'Big bucket energy: four shots of espresso over ice, topped the Hilltop way. Stop in while we are pouring it.',
    '/assets/promo/hilltop-handle.png',
    'Hilltop Handle iced coffee in a clear bucket cup',
    1,
    true
  ),
  (
    'Hilltop Half & Half, 32 oz, 16 oz / side',
    'Featuring the banana bread latte and banana bread matcha',
    'Two drinks, one cup, split down the middle so you do not have to choose. Ask for it on your next visit.',
    '/assets/promo/hilltop-half-half.png',
    'Hilltop Half and Half split cup with matcha and latte',
    2,
    true
  );

insert into public.gallery_items (image_url, alt_text, caption, sort_order, is_published)
values
  ('/assets/promo/hilltop-handle.png', 'Hilltop Handle iced coffee', 'Hilltop Handle', 1, true),
  ('/assets/promo/hilltop-half-half.png', 'Split cup matcha and latte', 'Hilltop Half & Half', 2, true),
  ('/assets/menu/menu1.png', 'Matcha and specialty menu board', 'Matcha + Specialty Lab', 3, true);
