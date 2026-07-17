-- Execute este script no seu banco Postgres (Neon) antes do primeiro deploy.
-- Você pode rodá-lo pelo SQL Editor do console do Neon, ou via psql:
--   psql "$DATABASE_URL" -f schema.sql

create extension if not exists pgcrypto;

create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  author text not null,
  category text not null check (category in ('codificacao', 'psicografia', 'romance', 'estudo')),
  rating int not null check (rating between 1 and 5),
  text text not null,
  reviewer text not null,
  created_at timestamptz not null default now()
);

create index if not exists reviews_created_at_idx on reviews (created_at desc);