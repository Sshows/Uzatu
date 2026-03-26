create extension if not exists "pgcrypto";

create table if not exists public.rsvp_submissions (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  contact text not null,
  attendance text not null check (attendance in ('yes', 'maybe', 'no')),
  guest_count integer not null check (guest_count >= 0 and guest_count <= 6),
  dietary_notes text,
  comment text,
  event_type text,
  bride_name text,
  submitted_at timestamptz not null default now()
);

create index if not exists rsvp_submissions_submitted_at_idx
  on public.rsvp_submissions (submitted_at desc);
