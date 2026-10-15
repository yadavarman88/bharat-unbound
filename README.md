# BHARAT UNBOUND

Discover India beyond the ordinary.

An editorial Indian travel discovery site with a curated, no-API itinerary planner. It runs without secrets or third-party service credentials. Saved journeys are stored in the visitor's browser.

The planner includes destination and seasonal filters, cost breakdowns by category, deterministic itinerary explanations, trip comparison, cultural bookmarks, a travel checklist, and print-to-PDF output. Weather guidance is seasonal, not a live forecast; prices are estimates, not quotes or bookings. Saved journeys do not sync across devices.

## Local development

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Verification

```bash
npm run lint
npx tsc --noEmit
npm run build
```

There is no automated test script configured. The planner uses local destination data, and all itinerary costs are illustrative estimates rather than live prices or bookings.

## Deploy to Vercel

1. Import this Git repository in the Vercel dashboard.
2. Keep the detected Next.js framework and repository root settings.
3. Add no environment variables; none are required.
4. Deploy. Vercel uses the existing `npm run build` script.

Destination and experience photography is served from Unsplash and Wikimedia Commons, so those images require a network connection. The Hampi image is credited in the interface (Vyacheslav Argenberg, CC BY 4.0).
