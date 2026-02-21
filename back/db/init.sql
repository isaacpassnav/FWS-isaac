create extension if not exists pgcrypto;

create table if not exists public.activities (
    id uuid primary key default gen_random_uuid(),
    title text not null check (char_length(title) between 3 and 120),
    description text not null check (char_length(description) between 10 and 1000),
    img_url text not null,
    created_at timestamptz not null default now()
);

create index if not exists idx_activities_created_at
    on public.activities (created_at desc);

alter table public.activities enable row level security;

revoke all on table public.activities from anon, authenticated;
