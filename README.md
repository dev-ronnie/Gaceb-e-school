# GACEB Scholar

All files sit in one folder on purpose. `organize.mjs` moves them into `src/` and `public/` automatically on `npm run dev` / `npm run build` (Vercel runs the build). Do not delete it.

## Setup order
1. Upload every file here to GitHub, connect the repo to Vercel, deploy.
2. Supabase > SQL Editor: run `gaceb-new-tables.sql` once (announcements, calendar, photo bucket). Skip `gaceb-notices-calendar.sql` (the site no longer uses notices).
3. Run `gaceb-setup-check.sql` block by block. Block 5 makes your account admin: put your email in it first.
4. Log in on the site with that account, then post a test announcement and add a calendar event.
5. Add `gauge-portrait.jpg` (your photo, square) to this folder and redeploy.

Before running any old SQL, check the payment number: `gaceb-notices-calendar.sql` has 0783165723, but the site config has 0783165623.
