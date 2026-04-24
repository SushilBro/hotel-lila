create extension if not exists "pgcrypto";

create table if not exists public.rooms (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  summary text not null,
  description text not null,
  price_per_night integer not null check (price_per_night > 0),
  max_guests integer not null check (max_guests > 0),
  is_published boolean not null default true,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.room_images (
  id uuid primary key default gen_random_uuid(),
  room_id uuid references public.rooms(id) on delete cascade,
  image_url text not null,
  storage_path text,
  caption text,
  category text not null default 'gallery',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.amenities (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  icon text,
  description text not null,
  sort_order integer not null default 0,
  is_published boolean not null default true
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  check_in date not null,
  check_out date not null,
  guests integer not null check (guests > 0),
  full_name text not null,
  email text not null,
  phone text not null,
  message text not null default '',
  status text not null default 'new' check (status in ('new','contacted','confirmed','closed')),
  created_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  guest_name text not null,
  quote text not null,
  rating integer not null default 5 check (rating between 1 and 5),
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.offers (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  price_hint text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.seo_pages (
  page_key text primary key,
  title text not null,
  description text not null,
  canonical text not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'admin' check (role in ('admin')),
  created_at timestamptz not null default now()
);

alter table public.rooms enable row level security;
alter table public.room_images enable row level security;
alter table public.amenities enable row level security;
alter table public.inquiries enable row level security;
alter table public.testimonials enable row level security;
alter table public.offers enable row level security;
alter table public.site_settings enable row level security;
alter table public.seo_pages enable row level security;
alter table public.profiles enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  );
$$;

drop policy if exists "public_read_rooms" on public.rooms;
create policy "public_read_rooms" on public.rooms for select using (is_published = true);
drop policy if exists "admin_write_rooms" on public.rooms;
create policy "admin_write_rooms" on public.rooms for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public_read_room_images" on public.room_images;
create policy "public_read_room_images" on public.room_images for select using (true);
drop policy if exists "admin_write_room_images" on public.room_images;
create policy "admin_write_room_images" on public.room_images for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public_read_amenities" on public.amenities;
create policy "public_read_amenities" on public.amenities for select using (is_published = true);
drop policy if exists "admin_write_amenities" on public.amenities;
create policy "admin_write_amenities" on public.amenities for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public_insert_inquiries" on public.inquiries;
create policy "public_insert_inquiries" on public.inquiries for insert with check (true);
drop policy if exists "admin_read_write_inquiries" on public.inquiries;
create policy "admin_read_write_inquiries" on public.inquiries for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public_read_testimonials" on public.testimonials;
create policy "public_read_testimonials" on public.testimonials for select using (is_published = true);
drop policy if exists "admin_write_testimonials" on public.testimonials;
create policy "admin_write_testimonials" on public.testimonials for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public_read_offers" on public.offers;
create policy "public_read_offers" on public.offers for select using (is_active = true);
drop policy if exists "admin_write_offers" on public.offers;
create policy "admin_write_offers" on public.offers for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public_read_site_settings" on public.site_settings;
create policy "public_read_site_settings" on public.site_settings for select using (true);
drop policy if exists "admin_write_site_settings" on public.site_settings;
create policy "admin_write_site_settings" on public.site_settings for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public_read_seo_pages" on public.seo_pages;
create policy "public_read_seo_pages" on public.seo_pages for select using (true);
drop policy if exists "admin_write_seo_pages" on public.seo_pages;
create policy "admin_write_seo_pages" on public.seo_pages for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin_manage_profiles" on public.profiles;
create policy "admin_manage_profiles" on public.profiles for all using (public.is_admin()) with check (public.is_admin());

insert into storage.buckets (id, name, public)
values ('room-images', 'room-images', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('gallery-images', 'gallery-images', true)
on conflict (id) do nothing;

drop policy if exists "public_read_room_images_bucket" on storage.objects;
create policy "public_read_room_images_bucket"
on storage.objects for select
using (bucket_id in ('room-images', 'gallery-images'));

drop policy if exists "admin_write_room_images_bucket" on storage.objects;
create policy "admin_write_room_images_bucket"
on storage.objects for all
using (bucket_id in ('room-images', 'gallery-images') and public.is_admin())
with check (bucket_id in ('room-images', 'gallery-images') and public.is_admin());
