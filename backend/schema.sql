-- jobLens database schema
-- Mirrors backend/app/models/{user,job,application,ai_analysis}.py
-- Run this in the Supabase SQL Editor (Dashboard -> SQL Editor -> New query).

create extension if not exists pgcrypto;

-- ============================================================
-- users
-- ============================================================
create table if not exists users (
    id             uuid primary key default gen_random_uuid(),
    email          varchar(255) not null unique,
    password_hash  varchar(255) not null,
    full_name      varchar(255) not null,
    role           varchar(20) not null default 'candidate'
                   check (role in ('candidate', 'manager', 'admin')),
    title          varchar(255),
    bio            text,
    resume_url     text,
    avatar_url     text,
    created_at     timestamp not null default now()
);

create index if not exists ix_users_email on users (email);

-- ============================================================
-- jobs
-- ============================================================
create table if not exists jobs (
    id                uuid primary key default gen_random_uuid(),
    manager_id        uuid not null references users (id) on delete cascade,
    title             varchar(255) not null,
    company           varchar(255) not null,
    location          varchar(255),
    employment_type   varchar(50)
                      check (employment_type in ('fulltime', 'contract', 'parttime')),
    level             varchar(50)
                      check (level in ('junior', 'mid', 'senior')),
    description       text,
    required_skills   json default '[]',
    status            varchar(20) not null default 'draft'
                      check (status in ('draft', 'published')),
    created_at        timestamp not null default now(),
    updated_at        timestamp not null default now()
);

create index if not exists ix_jobs_manager_id on jobs (manager_id);
create index if not exists ix_jobs_status on jobs (status);

-- ============================================================
-- applications
-- ============================================================
create table if not exists applications (
    id             uuid primary key default gen_random_uuid(),
    job_id         uuid not null references jobs (id) on delete cascade,
    candidate_id   uuid not null references users (id) on delete cascade,
    cover_letter   text,
    resume_url     text,
    status         varchar(20) not null default 'submitted'
                   check (status in ('submitted', 'under_review', 'accepted', 'rejected')),
    applied_at     timestamp not null default now(),

    constraint uq_application_job_candidate unique (job_id, candidate_id)
);

create index if not exists ix_applications_job_id on applications (job_id);
create index if not exists ix_applications_candidate_id on applications (candidate_id);

-- ============================================================
-- ai_analyses
-- ============================================================
create table if not exists ai_analyses (
    id               uuid primary key default gen_random_uuid(),
    application_id   uuid not null unique references applications (id) on delete cascade,
    score            integer,
    match_status     varchar(30)
                     check (match_status in ('strong_match', 'good_match', 'requires_review')),
    matched_skills   json,
    missing_skills   json,
    recommendation   text,
    created_at       timestamp not null default now()
);
