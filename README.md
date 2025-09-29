# DriveDesk

DriveDesk is a Nuxt 3 + Supabase multi-tenant fleet maintenance manager. It delivers tenant-isolated vehicle tracking, maintenance planning, trial-based subscriptions, multi-language UI, and dark mode out of the box.

## Tech stack

- [Nuxt 3](https://nuxt.com) with TypeScript and server routes
- [Supabase](https://supabase.com) authentication, database, storage, and row-level security
- [Pinia](https://pinia.vuejs.org/) stores for state management
- [Tailwind CSS](https://tailwindcss.com/) and [Nuxt UI](https://ui.nuxt.com) for theming and components
- [@nuxtjs/i18n](https://i18n.nuxtjs.org/) for English and Greek localisation

## Getting started

```bash
npm install
npm run dev
```

Before running the dev server, copy `.env.example` to `.env` and set your Supabase credentials:

```
SUPABASE_URL=...
SUPABASE_KEY=...
```

## Project structure

```
src/
  layouts/           # Default layout with sidebar + command bar
  pages/             # Nuxt file-based routes (dashboard, vehicles, checks, etc.)
  components/        # Modular UI components grouped by domain
  stores/            # Pinia stores interacting with Supabase RPC endpoints
  composables/       # Shared utilities (theme, status engine)
  locales/           # i18n JSON resources
supabase/schema.sql  # Database tables, RLS policies, triggers
```

## Supabase schema

Run the SQL in `supabase/schema.sql` to provision the tables, policies, and helper functions required by the app. The schema includes:

- `clients` / `client_roles` for multi-tenant isolation
- `subscriptions` for free trial tracking and locking
- `vehicles`, `check_types`, `check_plans`, `check_logs`, `vehicle_files`
- RLS policies ensuring users only see records for their tenant
- Triggers that auto-create subscription rows and enforce trial expiry

## Onboarding new tenants

See `docs/ONBOARDING.md` for the step-by-step workflow to register clients, assign users, extend the trial, and customise modules.

## Scripts

- `npm run dev` – start the Nuxt dev server
- `npm run build` – create a production build
- `npm run generate` – generate a static site (where applicable)
- `npm run preview` – preview the production build
- `npm run lint` – run ESLint with the Nuxt TypeScript config

## Next steps

- Implement PDF/CSV exports within the Supabase RPC functions
- Connect the notification settings to an email provider
- Introduce paid billing plans once the trial expires
