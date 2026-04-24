# HotelLilaIn - Next.js + Supabase Production Starter

Production-ready monorepo for HotelLilaIn with:
- Public conversion-focused website (`apps/web`)
- Secure admin CMS (`apps/admin`)
- Supabase-backed CMS/booking inquiries (Postgres, RLS, Storage)
- SEO/local-SEO foundations (metadata, JSON-LD, sitemap, robots)

## Tech Stack
- Next.js App Router + TypeScript
- Tailwind CSS + shared UI package
- Supabase (Postgres, Auth, Storage, RLS)
- Zod validation
- Server Actions + Resend email
- Vitest (unit) + Playwright (e2e smoke)

## Repository Structure
- `apps/web` - public marketing + inquiry flow
- `apps/admin` - auth-protected admin dashboard
- `packages/ui` - shared UI primitives
- `packages/domain` - shared Zod schemas/types
- `packages/config` - shared presets/configs
- `supabase/migrations` - SQL migrations
- `supabase/seed.sql` - initial content seed

## Local Setup
1. Copy env vars:
   - `cp .env.example .env` (or create manually on Windows)
2. Install dependencies:
   - `pnpm install`
3. Start Supabase local stack (if using local):
   - `supabase start`
4. Apply schema and seed:
   - `supabase db push`
   - `supabase db seed`
5. Run apps:
   - `pnpm dev`
   - Web: `http://localhost:3000`
   - Admin: `http://localhost:3001/login`

## Admin User Bootstrap
Create the first Supabase Auth user, then promote as admin:

1. Create user in Supabase Auth dashboard (email/password), or via API.
2. Insert profile row with `role='admin'`:

```sql
insert into public.profiles (id, full_name, role)
values ('<auth_user_uuid>', 'Sushil Gautam', 'admin')
on conflict (id) do update set role = 'admin';
```

3. Login at `/login` in `apps/admin`.

## Build, Test, and Quality
- `pnpm build`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm e2e`

## Deployment (Vercel + Supabase)
1. Create two Vercel projects:
   - `apps/web`
   - `apps/admin`
2. Add required env vars from `.env.example` to both.
3. Set production URLs:
   - `NEXT_PUBLIC_SITE_URL` for web domain.
4. Run migrations on production Supabase:
   - `supabase db push --linked`
5. Seed optional starter content:
   - `supabase db seed --linked`

## SEO Checklist
- [x] Metadata API base templates
- [x] Per-page DB override support (`seo_pages`)
- [x] Open Graph + Twitter cards
- [x] Canonical URLs
- [x] `robots.ts` + `sitemap.ts`
- [x] JSON-LD: Hotel + LocalBusiness + BreadcrumbList + FAQPage
- [x] Pokhara + Methlang local relevance in content
- [x] Internal links among core pages

## Notes
- Inquiry flow is v1 inquiry-first (no payment gateway).
- Gallery supports URL-based inserts and storage uploads through admin.
- Key homepage texts/feature flags are DB-editable via admin.
# hotel-lila
