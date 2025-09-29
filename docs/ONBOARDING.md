# DriveDesk Onboarding Guide

This document describes how to provision a new tenant, configure Supabase and extend the DriveDesk Nuxt application.

## 1. Environment variables

The application relies on the following environment variables. Create a `.env` file in the project root and configure them before running `npm run dev`.

```
SUPABASE_URL=<your-supabase-url>
SUPABASE_KEY=<anon-or-service-role-key>
```

Nuxt automatically exposes the values to the Supabase module.

## 2. Provisioning a tenant

1. Insert a new row into the `clients` table with the company name. Use the SQL from `supabase/schema.sql` as reference.
2. Create user accounts in Supabase Auth and link them to the tenant by inserting rows into `client_users` (or updating the `profiles` view if using generated columns).
3. The `subscriptions` table automatically starts a 90-day trial via trigger logic. Verify `trial_expires_at` to communicate the deadline.

## 3. Assigning roles

Roles are managed through the `client_roles` table. Valid roles are `admin`, `manager`, and `viewer`.

- Admin: full access to fleet configuration and subscription controls.
- Manager: manage vehicles, checks, and files, but cannot modify subscription.
- Viewer: read-only access to dashboards and reports.

Apply row-level security policies so that users only see records where `client_id` matches their assigned tenant.

## 4. Extending modules

- **Vehicles**: extend `src/stores/vehicle.ts` and `supabase` RPC functions to surface new attributes (e.g., fuel type). Update the appropriate components in `src/components/vehicles` to display the new data.
- **Checks**: add new check types in `settings/checks`. They propagate to the calendar and dashboards automatically.
- **Notifications**: adjust defaults in `nuxt.config.ts` runtime config or extend `save_notification_settings` RPC to integrate with external services.

## 5. Import/Export

Use the placeholder RPC calls (`export_client_vehicles`, `generate_report`) as integration points for CSV/PDF generation. They currently return structured data; connect them to storage buckets or external processors as needed.

## 6. Trial management

The `useSubscriptionStore` centralizes trial logic. The `auth` middleware redirects locked tenants to `/settings/subscription`. Admins can invoke `extend_trial_period` or `activate_subscription` RPCs from the subscription settings panel.

## 7. Multi-language & Theming

Translation keys live in `src/locales`. Add new locales by dropping JSON files in the same folder and updating `nuxt.config.ts`. Theme toggling is handled by the `useTheme` composable.

## 8. Testing checklist

- Run `npm run dev` and sign in through Supabase Auth.
- Verify dashboards display tenant-specific data.
- Confirm RLS by attempting to query another client's data; Supabase should deny access.
- Trigger trial expiration logic and ensure the lock screen renders.

For schema updates refer to `supabase/schema.sql` and apply migrations through the Supabase dashboard or CLI.
