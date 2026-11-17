# Loopdata — Next.js Landing Page

A responsive, dark-mode SaaS marketing website for Loopdata, built with Next.js 16 App Router, React 19, TypeScript, and custom CSS.

## Run locally

Requirements: Node.js 20.9+ and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm start
```

## Project structure

```text
app/
  globals.css              Design system, layout, responsive styles, animations
  layout.tsx               Root layout and metadata
  page.tsx                 Landing page composition
components/
  brand.tsx                Loopdata wordmark
  navbar.tsx               Responsive navigation
  hero.tsx                 Hero copy and data-flow illustration
  dashboard-preview.tsx    Interactive dashboard mockup and SVG chart
  section-heading.tsx      Shared section heading
  reveal.tsx               Scroll reveal animation wrapper
  features.tsx             Product feature cards
  integrations.tsx         Integration network illustration
  how-it-works.tsx         Three-step product explanation
  pricing.tsx              Monthly/yearly pricing toggle and plans
  demo-form.tsx            API-connected demo request form
  footer.tsx               Footer and link groups
  newsletter-form.tsx      API-connected newsletter form
  system-status.tsx        Health endpoint status indicator
lib/
  api.ts                    Shared JSON validation/response handling
  submissions.ts            In-memory submission repository
  validation.ts             Zod request schemas
```

## UI interactions included

- Responsive mobile navigation with open/close state.
- Dashboard period selector updates the SVG revenue chart.
- Dashboard sidebar navigation changes the active section label.
- Pricing toggle switches monthly/yearly prices.
- Demo request and newsletter forms submit to the API with loading, validation, and error states.
- Footer system status checks `/api/health`.
- Scroll-based reveal animations with reduced-motion support.
- Hover states, focus states, smooth anchor navigation, and responsive layouts.

## API

All submission routes return JSON. Invalid request bodies return `400` with a `VALIDATION_ERROR` and field-specific messages. Accepted submissions return `201`.

| Method | Path | Purpose |
| --- | --- | --- |
| `POST` | `/api/contact` | Store a contact message (`name`, `email`, `message`; optional `company`) |
| `POST` | `/api/demo` | Store a demo request (`name`, `email`, `company`, `teamSize`, `plan`; optional `message`) |
| `POST` | `/api/newsletter` | Subscribe an email address |
| `GET` | `/api/health` | Report API and persistence availability |

Example:

```bash
curl -X POST http://localhost:3000/api/demo \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Jamie Davis\",\"email\":\"jamie@company.com\",\"company\":\"Acme\",\"teamSize\":\"2–10 people\",\"plan\":\"Growth\",\"message\":\"Connect our sales data.\"}"
```

Successful submission:

```json
{
  "data": { "id": "generated-uuid" },
  "message": "Your demo request has been received."
}
```

Validation error:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Please check the submitted information.",
    "fields": { "email": ["Enter a valid email address."] }
  }
}
```

Submissions use an in-memory repository for the prototype and are not durable across process restarts or serverless instances. `lib/submissions.ts` is the persistence boundary to replace with a PostgreSQL-backed implementation. No credentials or external services are required.

The dashboard values, integration states, and pricing figures are illustrative UI content, not live metrics or a commercial quote. Update the pricing tiers and plan limits before publishing. The login, signup, documentation, and social destinations are placeholders and should be connected to their actual routes/accounts.

## Design notes

- Deep navy foundation with violet and turquoise accents.
- Custom CSS components; no UI kit or external stock imagery.
- Dashboard charts and abstract data-flow graphics are SVG/CSS.
- `lucide-react` is used for interface icons.
- Google Fonts are requested for Manrope and DM Sans, with system fallbacks.
