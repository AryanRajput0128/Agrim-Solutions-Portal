# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

This project is the **Agrim Solutions** website — a professional land/property registration service office. The site allows visitors to learn about services and book appointments. Appointment data (name, phone, email, service type, query) is stored in a PostgreSQL database.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite (artifacts/agrim-solutions) at previewPath `/`
- **API framework**: Express 5 (artifacts/api-server) at previewPath `/api`
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Features

- Homepage with hero, services overview, stats, and CTA
- `/services` — detailed property registration services
- `/about` — about the office
- `/contact` — contact info and booking form
- `/book-appointment` — appointment booking form (name, phone, email, service type, query)
- Backend API stores appointments in PostgreSQL
- Real-time stats on homepage via `/api/appointments/stats/summary`

## Database Schema

- `appointments` table: id, name, phone, email, query, service_type, status, created_at

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
