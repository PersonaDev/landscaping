# EDH design preview

Latest addition: a standalone `/commercial-hoa` page with property services, process, service areas, FAQs, and a labeled property inquiry form. Submission opens an SMS draft; it does not save a lead, send a message automatically, or book work. Residential pricing is excluded. Homepage/menu links, canonical metadata, prerendering, sitemap and llms.txt include the new route. Five-route build/SEO checks passed; mobile overflow, required-address validation, property-type selection and menu/FAQ interaction were checked.

Branch: `design/conversion-refresh`. This worktree is a preview; nothing has been pushed or deployed to production.

## Design direction

Latest revision: quote builder moved into the image-background hero; italic emphasis and eyebrow labels removed. Preview offer is 10% off the first month of any recurring package, with regular monthly pricing and introductory terms displayed in the calculator and SMS draft. No expiry or scarcity claims. Confirm offer terms before any production rollout.

- Cream, forest green and editorial typography, using existing optimized photography and local fonts.
- Benefit-led homepage, services, before/after work, transparent quote steps and persistent mobile contact actions.
- Starting plan selection and visible quote now agree. Texting prepares a message; the visitor still sends it themselves.
- Keyboard-operable comparison sliders with corrected before/after labels, pressed states for plan selectors, skip link and reduced-motion support.

## Search preservation

Existing public routes, canonical domain, local business / FAQ structured data, prerendering, sitemap, robots and llms.txt remain in place. SEO and AI recommendations are not guaranteed by markup or design. No fabricated ratings, reviews or ranking promises were added.

The Google Preferred Source link follows https://developers.google.com/search/docs/appearance/preferred-sources and points at the canonical production hostname, not the preview. Google controls eligibility and the source picker; inclusion has not been verified. It is a user's personal preference, not an endorsement or a universal ranking boost.

## Review and rollout

The new homepage is in `HomeRefresh.tsx`; the other existing pages remain available. Preview pricing falls back to the existing defaults when the backend is unavailable. Production still loads the existing plan configuration endpoint.

Before publishing, confirm current prices and service areas with the business, review mobile and desktop layouts, and confirm the domain is selectable in Google's source picker. After publishing, compare qualified calls/text inquiries per visitor against a baseline; there is no measured conversion uplift yet. Track search performance separately in Search Console.

Build with the existing app build script. Then run `node artifacts/reaper-landscaping/scripts/check-refresh.mjs` from the repository root to verify prerendered SEO invariants.

## Validation in this preview

Production client + server builds and all SEO invariant checks passed. Browser checks passed for desktop/mobile overflow, rendered images, quote selection/SMS amounts, keyboard sliders, one H1 and the canonical domain. No browser console errors were observed in the built preview. The full TypeScript check was interrupted after prolonged reads of existing dependency declaration files; it is not claimed as passed. The existing tooltip sourcemap warning remains non-fatal.

Local production-mode preview: http://127.0.0.1:4189/ (while the preview server is running). It does not run the production backend, so live blog/admin/API functionality is not part of this local design test.
