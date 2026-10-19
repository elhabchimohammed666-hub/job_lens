# JobLens- AI-Powered Recruitment Platform

## Project Plan

---

## 1. Product Overview

**JobLens** is an AI-powered recruitment and job-matching platform with two portals:

- **Front Office (Candidate Portal):** Browse jobs, apply, track applications
- **Back Office (Manager Portal):** Post jobs, review applicants, view AI analysis and compatibility scores

Candidates never see AI scores. Only managers see the AI-generated analysis, skill matching, and recommendations.

---

## 2. Tech Stack

| Layer    | Technology                 | Notes                                      |
| -------- | -------------------------- | ------------------------------------------ |
| Bundler  | Vite                       | Fast HMR, ESBuild                          |
| Frontend | React 18+ (TypeScript)     | SPA with React Router                      |
| Styling  | Tailwind CSS 3             | Custom design tokens from DESIGN.md        |
| Icons    | Material Symbols Outlined  | Google Fonts hosted                        |
| Font     | Inter                      | Google Fonts hosted                        |
| HTTP     | Axios                      | API client with interceptors for auth      |
| Forms    | React Hook Form            | Validation, file uploads                   |
| State    | React Context + useReducer | Auth state, lightweight global state       |
| Backend  | Flask (Python)             | REST API - handled by backend team         |
| Database | PostgreSQL                 | Supabase instance for dev/testing          |
| Auth     | JWT (access + refresh)     | Stored in httpOnly cookies or localStorage |

---

## 3. Design System Summary

Extracted from `design/DESIGN.md` and the HTML mockups.

### Brand

- **Name:** JobLens
- **Style:** Corporate Modernism + Minimalism
- **Font:** Inter (exclusively)
- **Icons:** Material Symbols Outlined (variable font)

### Color Tokens (Tailwind custom colors)

```
primary:            #1f04bc
primary-container:  #3b33d1
on-primary:         #ffffff
surface:            #f9f9ff
surface-container-lowest: #ffffff
on-surface:         #141b2c
on-surface-variant: #464555
outline:            #777587
outline-variant:    #c7c4d8
error:              #ba1a1a
```

Full token list in `design/DESIGN.md` - replicate exactly in `tailwind.config.js`.

### Typography Scale (Tailwind custom fontSize)

| Token              | Size | Weight | Line Height |
| ------------------ | ---- | ------ | ----------- |
| display-xl         | 48px | 600    | 60px        |
| headline-lg        | 32px | 600    | 40px        |
| headline-lg-mobile | 24px | 600    | 32px        |
| title-md           | 18px | 600    | 28px        |
| body-lg            | 16px | 400    | 24px        |
| body-md            | 14px | 400    | 20px        |
| label-md           | 14px | 500    | 20px        |
| label-sm           | 12px | 500    | 18px        |

### Spacing

| Token          | Value  |
| -------------- | ------ |
| stack-sm       | 8px    |
| stack-md       | 16px   |
| stack-lg       | 24px   |
| gutter         | 24px   |
| section-gap    | 48px   |
| margin-mobile  | 16px   |
| margin-desktop | 32px   |
| container-max  | 1280px |

### Border Radius

| Token   | Value   |
| ------- | ------- |
| DEFAULT | 0.25rem |
| lg      | 0.5rem  |
| xl      | 0.75rem |
| full    | 9999px  |

### Elevation

- Cards: `box-shadow: 0px 4px 12px rgba(16, 24, 40, 0.05)`
- Active/selected states: left border accent or background tint (not heavier shadow)

---

## 4. Pages & Routes

### Candidate Portal (Public + Auth Required)

| Route           | Page                 | Auth? | Design File             |
| --------------- | -------------------- | ----- | ----------------------- |
| `/`             | Landing Page         | No    | LandingPage.html        |
| `/jobs`         | Job Search & Listing | No    | Jobs.html               |
| `/jobs/:id`     | Job Detail           | No    | (implied - modal/page)  |
| `/login`        | Login                | No    | Login.html              |
| `/register`     | Sign Up              | No    | SignUp.html             |
| `/applications` | My Applications      | Yes   | Applications(User).html |
| `/profile`      | Profile & Resume     | Yes   | (to be designed)        |

### Manager Portal (Auth Required, role=manager)

| Route                                | Page                | Design File                 |
| ------------------------------------ | ------------------- | --------------------------- |
| `/manager`                           | Dashboard           | ManagerDashBoard.html       |
| `/manager/jobs`                      | Job Management      | JobManagement(Manager).html |
| `/manager/jobs/:jobId/applicants`    | Job Applicants List | JobApplicants.html          |
| `/manager/applicants/:applicationId` | AI Analysis Detail  | AianalysisTab.html          |

---

## 5. Frontend Folder Structure

```
frontend/
  public/
    favicon.ico
  src/
    api/
      axios.js              # Axios instance, base URL, interceptors
      auth.js               # login(), register(), logout(), getMe()
      jobs.js               # getJobs(), getJob(), createJob(), updateJob(), deleteJob()
      applications.js       # getMyApplications(), applyToJob(), getApplicants()
      ai.js                 # getAiAnalysis() (manager only)
    assets/
      logo.svg
    components/
      layout/
        Navbar.jsx           # Top nav for candidate portal
        Footer.jsx           # Shared footer
        ManagerSidebar.jsx   # Side nav for manager portal
        ManagerLayout.jsx    # Layout wrapper: sidebar + main content
        CandidateLayout.jsx  # Layout wrapper: navbar + main + footer
      ui/
        Button.jsx           # Primary, secondary, danger variants
        Input.jsx            # Text input with label
        SearchBar.jsx        # Pill-shaped search bar (role + location)
        Chip.jsx             # Filter chip / tag pill
        StatusBadge.jsx      # Application status badge (color-coded)
        Card.jsx             # Generic card container
        Avatar.jsx           # User avatar (image or initials)
        Pagination.jsx       # Pagination controls
        Modal.jsx            # Reusable modal/dialog
        ScoreCircle.jsx      # AI compatibility score donut chart
        SkillTag.jsx         # Matched/missing skill item
      jobs/
        JobCard.jsx          # Job listing card (used in Jobs page)
        JobCardFeatured.jsx  # Bento grid card (used on Landing)
        JobFilters.jsx       # Sidebar filter panel
        JobTagBar.jsx        # Horizontal scrolling tag bar
      applications/
        ApplicationCard.jsx  # Application row card with status
      manager/
        MetricCard.jsx       # Dashboard KPI card
        JobTable.jsx         # Active jobs table (dashboard)
        JobManagementCard.jsx# Job card in management view
        ApplicantRow.jsx     # Applicant table row
        AiInsightCard.jsx    # AI insight panel
        ActivityFeed.jsx     # Recent activity timeline
        SkillsAnalysis.jsx   # Matched/missing skills panel
        RecommendationCard.jsx # AI recommendation + action buttons
    context/
      AuthContext.jsx        # Auth state, login/logout, user info, role
    hooks/
      useAuth.js             # Shortcut to AuthContext
      useJobs.js             # Job fetching & search logic
      useApplications.js     # Application fetching
    pages/
      Landing.jsx
      Jobs.jsx
      JobDetail.jsx
      Login.jsx
      Register.jsx
      Applications.jsx
      Profile.jsx
      manager/
        Dashboard.jsx
        JobManagement.jsx
        JobApplicants.jsx
        AiAnalysis.jsx
    routes/
      AppRouter.jsx          # React Router config
      ProtectedRoute.jsx     # Auth guard (redirect to /login)
      ManagerRoute.jsx       # Role guard (redirect if not manager)
    utils/
      constants.js           # API base URL, status enums, match thresholds
      formatters.js          # Date formatting, score formatting
    App.jsx                  # Root component
    main.jsx                 # Vite entry point
    index.css                # Tailwind directives + global styles
  tailwind.config.js         # Full design token config
  postcss.config.js
  vite.config.js
  package.json
  .env                       # VITE_API_URL, VITE_SUPABASE_URL
  .env.example
  .gitignore
  index.html
```

---

## 6. Backend Folder Structure (Flask)

Backend team: create this structure. Frontend will code against the API contract below.

```
backend/
  app/
    __init__.py              # Flask app factory, register blueprints
    config.py                # Config classes (Dev, Prod, Test)
    extensions.py            # db, migrate, jwt, cors init
    models/
      __init__.py
      user.py                # User model (id, email, password_hash, full_name, role, resume_url, profile)
      job.py                 # Job model (id, title, company, location, type, level, description, status, manager_id, created_at)
      application.py         # Application model (id, job_id, candidate_id, status, applied_at, resume_snapshot)
      ai_analysis.py         # AiAnalysis model (id, application_id, score, matched_skills, missing_skills, recommendation)
    routes/
      __init__.py
      auth.py                # POST /auth/register, POST /auth/login, GET /auth/me, POST /auth/logout
      jobs.py                # GET /jobs, GET /jobs/:id, POST /jobs, PUT /jobs/:id, DELETE /jobs/:id
      applications.py        # POST /jobs/:id/apply, GET /applications (my), GET /jobs/:id/applicants (manager)
      ai.py                  # GET /applications/:id/analysis (manager only)
    services/
      __init__.py
      auth_service.py        # Password hashing, JWT generation
      job_service.py         # Job CRUD logic
      application_service.py # Application logic
      ai_service.py          # AI scoring, skill extraction, recommendation generation
    middleware/
      __init__.py
      auth_middleware.py     # JWT verification decorator
      role_middleware.py     # Role-based access (candidate vs manager)
    utils/
      __init__.py
      validators.py          # Input validation helpers
      file_upload.py         # Resume upload to Supabase Storage
  migrations/                # Flask-Migrate / Alembic
  tests/
    __init__.py
    test_auth.py
    test_jobs.py
    test_applications.py
  requirements.txt
  .env
  .env.example
  .flaskenv                  # FLASK_APP, FLASK_ENV
  run.py                     # Entry point
```

---

## 7. API Contract (Frontend <-> Backend)

### Authentication

```
POST   /api/auth/register
  Body: { full_name, email, password, role: "candidate" | "manager" }
  Response: { user, access_token }

POST   /api/auth/login
  Body: { email, password }
  Response: { user, access_token }

GET    /api/auth/me
  Headers: Authorization: Bearer <token>
  Response: { user }

POST   /api/auth/logout
  Response: { message }
```

### Jobs

```
GET    /api/jobs
  Query: ?search=&location=&type=&level=&page=&limit=
  Response: { jobs: [...], total, page, pages }

GET    /api/jobs/:id
  Response: { job }

POST   /api/jobs                    (manager only)
  Body: { title, company, location, type, level, description, required_skills }
  Response: { job }

PUT    /api/jobs/:id                (manager only, owner)
  Body: { title, company, location, type, level, description, status, required_skills }
  Response: { job }

DELETE /api/jobs/:id                (manager only, owner)
  Response: { message }
```

### Applications

```
POST   /api/jobs/:id/apply          (candidate only)
  Body: { cover_letter? } + multipart resume file
  Response: { application }

GET    /api/applications            (candidate: my applications)
  Response: { applications: [...] }

GET    /api/jobs/:id/applicants     (manager only)
  Query: ?match_status=&search=&page=&limit=
  Response: { applicants: [...], total, page }

PATCH  /api/applications/:id/status (manager only)
  Body: { status: "submitted" | "under_review" | "accepted" | "rejected" }
  Response: { application }
```

### AI Analysis

```
GET    /api/applications/:id/analysis   (manager only)
  Response: {
    score: 92,
    match_status: "strong_match" | "good_match" | "requires_review",
    matched_skills: [{ name, level }],
    missing_skills: [{ name }],
    recommendation: "string",
    candidate: { name, title, location, experience, education, bio }
  }
```

---

## 8. Database Schema (PostgreSQL / Supabase)

### users

| Column        | Type         | Notes                     |
| ------------- | ------------ | ------------------------- |
| id            | UUID (PK)    | Default gen_random_uuid() |
| email         | VARCHAR(255) | UNIQUE, NOT NULL          |
| password_hash | VARCHAR(255) | NOT NULL                  |
| full_name     | VARCHAR(255) | NOT NULL                  |
| role          | VARCHAR(20)  | 'candidate' or 'manager'  |
| title         | VARCHAR(255) | Job title / profession    |
| bio           | TEXT         | Short bio                 |
| resume_url    | TEXT         | Supabase Storage URL      |
| avatar_url    | TEXT         |                           |
| created_at    | TIMESTAMP    | DEFAULT now()             |

### jobs

| Column          | Type         | Notes                            |
| --------------- | ------------ | -------------------------------- |
| id              | UUID (PK)    |                                  |
| manager_id      | UUID (FK)    | -> users.id                      |
| title           | VARCHAR(255) | NOT NULL                         |
| company         | VARCHAR(255) | NOT NULL                         |
| location        | VARCHAR(255) |                                  |
| employment_type | VARCHAR(50)  | 'fulltime','contract','parttime' |
| level           | VARCHAR(50)  | 'junior','mid','senior'          |
| description     | TEXT         |                                  |
| required_skills | JSONB        | Array of skill strings           |
| status          | VARCHAR(20)  | 'draft' or 'published'           |
| created_at      | TIMESTAMP    |                                  |
| updated_at      | TIMESTAMP    |                                  |

### applications

| Column       | Type        | Notes                                            |
| ------------ | ----------- | ------------------------------------------------ |
| id           | UUID (PK)   |                                                  |
| job_id       | UUID (FK)   | -> jobs.id                                       |
| candidate_id | UUID (FK)   | -> users.id                                      |
| cover_letter | TEXT        |                                                  |
| resume_url   | TEXT        | Snapshot of resume at application time           |
| status       | VARCHAR(20) | 'submitted','under_review','accepted','rejected' |
| applied_at   | TIMESTAMP   | DEFAULT now()                                    |

### ai_analyses

| Column         | Type        | Notes                                         |
| -------------- | ----------- | --------------------------------------------- |
| id             | UUID (PK)   |                                               |
| application_id | UUID (FK)   | -> applications.id, UNIQUE                    |
| score          | INTEGER     | 0-100 compatibility percentage                |
| match_status   | VARCHAR(30) | 'strong_match','good_match','requires_review' |
| matched_skills | JSONB       | [{ name, level }]                             |
| missing_skills | JSONB       | [{ name }]                                    |
| recommendation | TEXT        | AI-generated text                             |
| created_at     | TIMESTAMP   |                                               |

---

## 9. Component-to-Page Mapping

### Landing Page (`/`)

- `Navbar` (with Sign In + Register buttons)
- `SearchBar` (hero section)
- `Chip` (popular search tags)
- `JobCardFeatured` (bento grid, 4 cards)
- `Footer`

### Jobs Page (`/jobs`)

- `Navbar`
- `SearchBar` (hero)
- `JobTagBar` (horizontal scroll chips)
- `JobFilters` (sidebar: keyword, speciality, employment, salary type)
- `JobCard` (list of job rows)
- `Footer`

### Login (`/login`)

- `Input` (email, password)
- `Button` (Sign In)
- Admin Login link

### Register (`/register`)

- `Input` (full name, email, password, confirm password)
- `Button` (Create Account)

### My Applications (`/applications`)

- `Navbar`
- `ApplicationCard` (list with StatusBadge)
- `Pagination`
- `Footer`

### Manager Dashboard (`/manager`)

- `ManagerSidebar`
- `MetricCard` (3x: active jobs, new applications, matched candidates)
- `JobTable` (active job offers)
- `AiInsightCard`
- `ActivityFeed`

### Job Management (`/manager/jobs`)

- `ManagerSidebar`
- Search + filter chips
- `JobManagementCard` (list with edit/delete/view applicants actions)

### Job Applicants (`/manager/jobs/:id/applicants`)

- `ManagerSidebar`
- Stats cards (total applicants, shortlisted)
- Search + filter chips (All, Strong Match, Good Match, Requires Review)
- `ApplicantRow` (table with `ScoreCircle` + `StatusBadge`)
- `Pagination`

### AI Analysis (`/manager/applicants/:id`)

- `ManagerSidebar` (or top nav with Manager Dashboard link)
- Candidate info card (`Avatar` + chips)
- `ScoreCircle` (donut chart, large)
- `SkillsAnalysis` (matched vs missing)
- `RecommendationCard` (Accept, Keep Under Review, Reject)

---

## 10. Application Status Flow

```
Candidate applies -> "submitted"
Manager reviews   -> "under_review"
Manager decides   -> "accepted" OR "rejected"
```

### Status Badge Colors

| Status       | Background | Text Color |
| ------------ | ---------- | ---------- |
| Submitted    | blue-50    | blue-700   |
| Under Review | yellow-50  | yellow-700 |
| Accepted     | green-50   | green-700  |
| Rejected     | red-50     | red-700    |

### AI Match Status Colors

| Match Status    | Score Range | Border/Ring | Text Color |
| --------------- | ----------- | ----------- | ---------- |
| Strong Match    | 90-100%     | green-500   | green-800  |
| Good Match      | 75-89%      | blue-500    | blue-800   |
| Requires Review | 0-74%       | yellow-500  | yellow-800 |

---

## 11. Auth & Role Logic

### Roles

- **candidate** - default on registration via `/register`
- **manager** - set via admin login or separate registration flow

### Route Protection

| Route Pattern               | Access                         |
| --------------------------- | ------------------------------ |
| `/`, `/jobs`, `/jobs/:id`   | Public (anyone)                |
| `/login`, `/register`       | Public (redirect if logged in) |
| `/applications`, `/profile` | Authenticated candidates       |
| `/manager/*`                | Authenticated managers only    |

### Auth Flow

1. User registers or logs in -> receives JWT token
2. Token stored in localStorage (or httpOnly cookie)
3. Axios interceptor attaches `Authorization: Bearer <token>` header
4. `ProtectedRoute` checks `AuthContext` for user presence
5. `ManagerRoute` additionally checks `user.role === 'manager'`

---

## 12. Key Frontend Implementation Notes

### Tailwind Config

Copy the full color/spacing/typography tokens from `design/DESIGN.md` into `tailwind.config.js`. The HTML mockups already use these tokens as class names (e.g., `text-primary`, `bg-surface-container-lowest`, `text-headline-lg`). The Tailwind config in every HTML file is identical - extract once and share.

### Navigation Pattern

- **Candidate pages** use a **top horizontal navbar** (`Navbar.jsx`)
- **Manager pages** use a **fixed left sidebar** (`ManagerSidebar.jsx`, 280px wide) + no top navbar
- Mobile: sidebar collapses to hamburger menu

### Key UI Patterns from Designs

1. **Glass panel** effect on Landing hero (backdrop-filter blur)
2. **Pill-shaped search bar** with divider between fields
3. **Left blue border** on active/selected job cards
4. **Donut chart** for AI compatibility score (SVG-based)
5. **Timeline** dots for activity feed
6. **Avatar stacking** (-space-x-2) for applicant counts

### File Upload

Resume upload via `<input type="file">` -> multipart form data to Flask -> stored in Supabase Storage -> URL saved in DB.

---

## 13. Development Workflow

### Getting Started (Frontend)

```bash
cd frontend
npm install
cp .env.example .env         # Set VITE_API_URL
npm run dev                  # Starts on http://localhost:5173
```

### Getting Started (Backend)

```bash
cd backend
python -m venv venv
source venv/bin/activate     # or venv\Scripts\activate on Windows
pip install -r requirements.txt
cp .env.example .env         # Set DATABASE_URL, JWT_SECRET, etc.
flask db upgrade             # Run migrations
flask run                    # Starts on http://localhost:5000
```

### Environment Variables

**Frontend (.env)**

```
VITE_API_URL=http://localhost:5000/api
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**Backend (.env)**

```
DATABASE_URL=postgresql://user:pass@host:5432/skillmatch
JWT_SECRET_KEY=your-secret-key
FLASK_ENV=development
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-key
AI_API_KEY=your-ai-api-key
```

---

## 14. Task Breakdown & Assignment

### Frontend Tasks (Priority Order)

| #   | Task                                                     | Depends On | Est. |
| --- | -------------------------------------------------------- | ---------- | ---- |
| F1  | Project setup (Vite + Tailwind + Router + design tokens) | -          | 1h   |
| F2  | Shared UI components (Button, Input, Card, Chip, etc.)   | F1         | 2h   |
| F3  | Navbar + Footer + ManagerSidebar layouts                 | F1         | 1.5h |
| F4  | Auth context + ProtectedRoute + ManagerRoute             | F1         | 1h   |
| F5  | Login + Register pages                                   | F2,F3      | 1.5h |
| F6  | Landing page                                             | F2,F3      | 1.5h |
| F7  | Jobs page (search, filters, listing)                     | F2,F3      | 2h   |
| F8  | Job Detail page/modal                                    | F7         | 1h   |
| F9  | My Applications page                                     | F2,F4      | 1.5h |
| F10 | Manager Dashboard                                        | F3,F4      | 2h   |
| F11 | Job Management page (CRUD)                               | F3,F4      | 2h   |
| F12 | Job Applicants page                                      | F11        | 1.5h |
| F13 | AI Analysis page                                         | F12        | 2h   |
| F14 | API integration (connect all pages to backend)           | F5-F13     | 2h   |
| F15 | File upload (resume)                                     | F14        | 1h   |

### Backend Tasks (Priority Order)

| #   | Task                                                 | Depends On | Est. |
| --- | ---------------------------------------------------- | ---------- | ---- |
| B1  | Project setup (Flask + extensions + config)          | -          | 1h   |
| B2  | Database models + migrations                         | B1         | 1.5h |
| B3  | Auth routes (register, login, me, logout)            | B2         | 2h   |
| B4  | Jobs CRUD routes                                     | B2,B3      | 2h   |
| B5  | Applications routes (apply, list mine, list per job) | B4         | 2h   |
| B6  | AI analysis service + routes                         | B5         | 3h   |
| B7  | File upload (resume to Supabase Storage)             | B3         | 1.5h |
| B8  | Status update route                                  | B5         | 1h   |
| B9  | Search, filtering, pagination                        | B4,B5      | 1.5h |

---

## 15. Supabase Setup (Testing)

1. Create a Supabase project
2. Use the auto-generated PostgreSQL connection string as `DATABASE_URL`
3. Create a `resumes` bucket in Supabase Storage (public or authenticated access)
4. Tables can be created via Flask migrations or Supabase SQL editor
5. Row Level Security (RLS) is optional for dev; Flask handles auth

---

## 16. Git Branch Strategy

```
main                    # Production-ready code
  develop               # Integration branch
    feature/frontend-setup
    feature/auth-ui
    feature/jobs-page
    feature/manager-dashboard
    feature/backend-auth
    feature/backend-jobs
    feature/ai-analysis
```

---

## 17. Reference: Design File to Screen Mapping

| Design File                 | Screenshot           | Implemented As                    |
| --------------------------- | -------------------- | --------------------------------- |
| LandingPage.html            | LandingPage.png      | `pages/Landing.jsx`               |
| Jobs.html                   | Jobs.png             | `pages/Jobs.jsx`                  |
| Applications(User).html     | Applications.png     | `pages/Applications.jsx`          |
| SignUp.html                 | SignUp.png           | `pages/Register.jsx`              |
| Login.html                  | Login.png            | `pages/Login.jsx`                 |
| ManagerDashBoard.html       | ManagerDashBoard.png | `pages/manager/Dashboard.jsx`     |
| JobManagement(Manager).html | JobManagement.png    | `pages/manager/JobManagement.jsx` |
| JobApplicants.html          | JobApplicants.png    | `pages/manager/JobApplicants.jsx` |
| AianalysisTab.html          | AianalysisTab.png    | `pages/manager/AiAnalysis.jsx`    |
