# Brainy Kings & Queens

Next.js website and Supabase-backed content management system for Brainy Kings & Queens Montessori.

## Supabase setup

1. Create a Supabase project and copy `.env.local.example` to `.env.local`.
2. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from the project API settings. The application uses the anon key with Row Level Security; the service-role key is not required by the CMS and must never be placed in a `NEXT_PUBLIC_*` variable or browser code.
3. In the Supabase SQL editor, run `supabase_schema.sql`, then run `supabase_seed.sql`. The schema creates the CMS tables, admin authorization functions, RLS policies, and the public-read/admin-write `cms-media` Storage bucket. The seed inserts the current website content while leaving existing page-section edits untouched and removes exact duplicate CMS records on reruns. To clean an existing project without reseeding, run `supabase_cleanup_duplicate_content.sql`; it keeps the oldest exact copy in each content group and excludes inquiries and uploaded media.
   If you already set up Supabase before updating the app, run `supabase_migration_gallery_page_key.sql` in the SQL editor (or rerun `supabase_schema.sql`) before deploying the updated app. This adds the `page_key` column required by the page-specific gallery query; existing gallery rows are assigned to `home`. Rerun `supabase_seed.sql` afterward if you also want the seeded About-page gallery items. Rerun `supabase_schema.sql` to update the public-read policies. Anonymous visitors can read published content; only authenticated requests evaluate the admin check, so unpublished content remains admin-only.
4. Create the first CMS user under **Authentication → Users** in the Supabase dashboard. Copy that user's UUID, then grant CMS access in the SQL editor:

	```sql
	INSERT INTO public.admins (id, is_super_admin)
	VALUES ('YOUR_AUTH_USER_UUID', true)
	ON CONFLICT (id) DO NOTHING;
	```

	Admin access is membership-based; signing up or knowing a URL does not grant admin permissions. Add further authorized users to `public.admins` using their Auth UUIDs.
5. Start the app with `npm run dev` and sign in at `/admin/login`.

## CMS features

- Manage homepage slides, page sections, academic programs, school values, curriculum principles, testimonials, page-specific gallery items, admissions steps, team members, and contact settings at `/admin/content`. Page-section entries are labeled with their page key; gallery items use `home` or `about` as their page key.
- Manage uploaded images in the media tab. JPEG, PNG, WebP, and GIF files up to 5 MB are accepted. Files are stored in Supabase Storage and their metadata is recorded in `media_library`.
- Review admissions inquiries from the admin sidebar. Public visitors can submit inquiries, but RLS restricts reading and managing them to authorized admins.
- Public routes read published rows from Supabase. Existing page content remains as a fallback until the corresponding table has published records.

## Security notes

- Admin routes are guarded by `middleware.ts`, which validates the Supabase Auth user and calls `is_cms_admin()` before allowing access. The admin shell repeats the membership check for client navigation.
- RLS is the authorization boundary for all content writes, inquiry reads, and Storage mutations. Do not disable RLS or expose a service-role key to the browser.
- Public content queries only return published rows where the table supports publishing. Site settings are public so the site can render its contact details.

## Verification

- Anonymous requests to `/admin/content` should redirect to `/admin/login`.
- A signed-in user absent from `public.admins` must remain blocked.
- An authorized admin can create, edit, publish/unpublish, and delete records in the content manager and upload/delete media.
- A public inquiry submission should create a row in `admissions_inquiries`; anonymous reads and updates to that table should be denied by RLS.
- Updates to published content should appear on the corresponding public route after refresh.