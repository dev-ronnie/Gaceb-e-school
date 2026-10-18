-- GACEB Scholar: setup check + admin switch.
-- SAFE: this file creates nothing and changes no existing table or policy.
-- Run each numbered block on its own in Supabase > SQL Editor.

-- 1) Does the admin helper exist? (should return one row)
select proname from pg_proc where proname = 'is_gaceb_admin';

-- 2) Are the new tables there with security switched on? (expect announcements and calendar_events, rowsecurity = true)
select tablename, rowsecurity
from pg_tables
where schemaname = 'public' and tablename in ('announcements', 'calendar_events', 'profiles', 'resources');

-- 3) Are the photo buckets there? (expect announcement-photos, public = true)
select id, public from storage.buckets where id in ('announcement-photos', 'study-pdfs');

-- 4) Policies on the new tables (expect read for everyone, manage for admins)
select tablename, policyname, cmd from pg_policies
where schemaname = 'public' and tablename in ('announcements', 'calendar_events')
order by tablename, policyname;

-- 5) Make YOUR account an admin. Replace the email, then run only this block.
update public.profiles set role = 'admin' where email = 'PUT-YOUR-EMAIL-HERE';

-- 6) Confirm who is admin
select full_name, email, role from public.profiles where role = 'admin';

-- 7) Confirm the UNEB date is on the calendar (expect 2026-11-06)
select title, event_date from public.calendar_events order by event_date;
