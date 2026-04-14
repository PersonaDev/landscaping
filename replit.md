# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   └── api-server/         # Express API server
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts (single workspace package)
│   └── src/                # Individual .ts scripts, run via `pnpm --filter @workspace/scripts run <script>`
├── pnpm-workspace.yaml     # pnpm workspace (artifacts/*, lib/*, lib/integrations/*, scripts)
├── tsconfig.base.json      # Shared TS options (composite, bundler resolution, es2022)
├── tsconfig.json           # Root TS project references
└── package.json            # Root package with hoisted devDeps
```

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references. This means:

- **Always typecheck from the root** — run `pnpm run typecheck` (which runs `tsc --build --emitDeclarationOnly`). This builds the full dependency graph so that cross-package imports resolve correctly. Running `tsc` inside a single package will fail if its dependencies haven't been built yet.
- **`emitDeclarationOnly`** — we only emit `.d.ts` files during typecheck; actual JS bundling is handled by esbuild/tsx/vite...etc, not `tsc`.
- **Project references** — when package A depends on package B, A's `tsconfig.json` must list B in its `references` array. `tsc --build` uses this to determine build order and skip up-to-date packages.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages that define it
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## Packages

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server. Routes live in `src/routes/` and use `@workspace/api-zod` for request and response validation and `@workspace/db` for persistence.

- Entry: `src/index.ts` — reads `PORT`, starts Express
- App setup: `src/app.ts` — mounts CORS, JSON/urlencoded parsing, routes at `/api`
- Routes: `src/routes/index.ts` mounts sub-routers; `src/routes/health.ts` exposes `GET /health` (full path: `/api/health`)
- Depends on: `@workspace/db`, `@workspace/api-zod`
- `pnpm --filter @workspace/api-server run dev` — run the dev server
- `pnpm --filter @workspace/api-server run build` — production esbuild bundle (`dist/index.cjs`)
- Build bundles an allowlist of deps (express, cors, pg, drizzle-orm, zod, etc.) and externalizes the rest

### `lib/db` (`@workspace/db`)

Database layer using Drizzle ORM with PostgreSQL. Exports a Drizzle client instance and schema models.

- `src/index.ts` — creates a `Pool` + Drizzle instance, exports schema
- `src/schema/index.ts` — barrel re-export of all models
- `src/schema/<modelname>.ts` — table definitions with `drizzle-zod` insert schemas (no models definitions exist right now)
- `drizzle.config.ts` — Drizzle Kit config (requires `DATABASE_URL`, automatically provided by Replit)
- Exports: `.` (pool, db, schema), `./schema` (schema only)

Production migrations are handled by Replit when publishing. In development, we just use `pnpm --filter @workspace/db run push`, and we fallback to `pnpm --filter @workspace/db run push-force`.

### `lib/api-spec` (`@workspace/api-spec`)

Owns the OpenAPI 3.1 spec (`openapi.yaml`) and the Orval config (`orval.config.ts`). Running codegen produces output into two sibling packages:

1. `lib/api-client-react/src/generated/` — React Query hooks + fetch client
2. `lib/api-zod/src/generated/` — Zod schemas

Run codegen: `pnpm --filter @workspace/api-spec run codegen`

### `lib/api-zod` (`@workspace/api-zod`)

Generated Zod schemas from the OpenAPI spec (e.g. `HealthCheckResponse`). Used by `api-server` for response validation.

### `lib/api-client-react` (`@workspace/api-client-react`)

Generated React Query hooks and fetch client from the OpenAPI spec (e.g. `useHealthCheck`, `healthCheck`).

### `artifacts/reaper-landscaping` (`@workspace/reaper-landscaping`)

React + Vite marketing website for **EDH Landscaping** (formerly Reaper Landscaping), a lawn care company in El Dorado Hills, CA.

**Brand:** EDH Landscaping · Phone: (916) 847-2095 · Color: #006837 · Font: DM Sans (all headings + body, no serif)

**Pages:**
- `/` — Main single-page marketing site (all sections below in order)
- `/testimonials` — Extended testimonials page (legacy, may be updated)
- `/services` — Services detail page (legacy, may be updated)

**Main page sections (Home.tsx):**
1. Hero — full-viewport, hero.webp background, "Your yard, handled." headline, Call/Text CTAs, 4 trust pills. **Desktop (lg+): QuoteBuilder shown on right side of hero over the image**
2. Trust bar — horizontal scroll strip of 5 credibility signals
3. Before/After gallery — 3 draggable slider components (`BeforeAfter.tsx`) with real photos
4. Reviews — 3 cards (Barbara M., Gary & Linda T., Richard K.)
5. Interactive Quote Builder (`QuoteBuilder.tsx`) — frequency × scope pricing widget, shown in standalone section on mobile (always visible on desktop in hero)
6. How It Works — 3 numbered steps
7. Crew section — crew photo + copy
8. Service area — city chips + Leaflet map with service area polygon
9. FAQ accordion (`FAQAccordion.tsx`) — one open at a time, smooth CSS grid transition
10. Final CTA — dark green section
11. Footer — dark (#111111), hidden SEO backlinks (greywhale.dev, bluedentist.greywhale.dev)

**Key components:**
- `SiteHeader.tsx` — sticky nav; desktop: nav links + Call/Text buttons; mobile: Call button only (no hamburger)
- `BeforeAfter.tsx` — drag-to-compare slider using clipPath + mouse/touch events
- `QuoteBuilder.tsx` — pricing card; receives frequency/scope state + optional dynamic config from API; frequency [monthly=$45, biweekly=$60, weekly=$90], scope [basic=+$0, full=+$20, total=+$40]; supports `compact` prop for hero placement
- `MobileSMSBar.tsx` — fixed bottom bar (mobile only, sm:hidden); syncs with quote builder state; shows instantly on load
- `FAQAccordion.tsx` — CSS grid-template-rows transition for smooth expand/collapse
- `LawnIcon.tsx` — SVG leaf icon used in header logo
- `SEO.tsx` — accepts optional title/description props; LocalBusiness structured data
- `lib/quote.ts` — shared constants, types (PlanConfig, FreqOption, ScopeOption, ServiceItem), and helpers (calcPrice, buildSMS); supports dynamic config from API
- `hooks/usePlanConfig.ts` — fetches plan config from `/api/plan-config`; falls back to hardcoded defaults

**Admin CMS (`/admin`):**
- Blog post CRUD (existing)
- **Plan Builder Config** — edit frequencies (label, price, SMS text, "popular" badge), service levels (label, addon price), and included services (name, minimum scope tier). Tab navigation between Blog Posts and Plan Builder. Config stored in `site_config` table as JSONB.

**API endpoints (Vercel serverless `api/handler.js`):**
- `GET /api/plan-config` — public, returns plan config (frequencies, scopes, services) from DB or defaults
- `PUT /api/plan-config` — admin auth required, saves plan config to `site_config` table
- Blog CRUD: GET/POST/PUT/DELETE `/api/posts`, GET `/api/posts/all` (admin)
- `POST /api/auth/login` — admin password auth, returns JWT

**SMS construction:** `buildSMS()` in `lib/quote.ts` detects iOS vs Android to set `&` or `?` body separator; uses `encodeURIComponent` on body.

### `scripts` (`@workspace/scripts`)

Utility scripts package. Each script is a `.ts` file in `src/` with a corresponding npm script in `package.json`. Run scripts via `pnpm --filter @workspace/scripts run <script>`. Scripts can import any workspace package (e.g., `@workspace/db`) by adding it as a dependency in `scripts/package.json`.
