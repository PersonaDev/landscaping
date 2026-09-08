# EDH Landscaping conversion and search research

Research date: September 8, 2026

## Decision summary

The commercial page should sell the next step instead of attempting to close a landscape contract on-page. The strongest funnel is: relevant local landing page → immediate proof of service fit → short property qualification → phone/text conversation → walkthrough → written proposal. The page therefore uses “request a walkthrough” and “proposal” language, asks only for property type, address, service need, and priorities, and keeps a call path visible.

The site should not claim that markup or AI-specific files guarantee rankings. Google says local visibility mainly depends on relevance, distance, and prominence, while its AI search features use the same foundational SEO requirements as ordinary Search. The implementation focuses on crawlable page content, canonical URLs, a dedicated service page, accurate service-area language, structured data, internal linking, and useful property-manager answers.

## Evidence and implementation choices

| Evidence | What it means for EDH | Implemented decision |
|---|---|---|
| Google says local results are mainly based on relevance, distance, and prominence; complete business information, reviews, replies, photos, and links can help. | A website alone cannot force a local-pack result. The landing page and Google Business Profile must agree on business identity, category, services, and service area. | Dedicated `/commercial-hoa` page, explicit service areas, consistent phone/name, crawlable service language, and page-specific schema. |
| Google documents LocalBusiness structured data as a way to describe business details and recommends validation, URL Inspection, and sitemap submission. | Markup should describe real visible content and be validated; it is not a ranking guarantee. | Existing LocalBusiness graph retained; a page-specific Service entity and commercial hero image were added. |
| Google says AI Overviews and AI Mode require no special AI markup and rely on normal Search eligibility and foundational SEO. | “AI optimization” is best treated as clear, factual, attributable content that search systems can crawl and understand. | Direct answers, clear entity/service/location language, canonical page, structured data, sitemap and `llms.txt`; no invented AI-ranking claims. |
| Jobber’s 2026 home-service study reports that price and reviews lead hiring considerations, while response speed matters to one in four customers and more than half expect a reply within an hour. | The page must produce an actionable inquiry and the business needs a rapid operating follow-up. | Phone/text are the primary conversion paths; the form creates a structured, prefilled inquiry. No unverified response-time promise was added. |
| BrightLocal’s 2025 survey found only 4% of consumers never read reviews and that buyers increasingly value factual detail plus photos/video. | Real reviews and real work photos are major missing proof assets; fabricated testimonials would be counterproductive. | The design leaves claims conservative. A future release should add verified Google reviews and real commercial project photos once available. |
| Commercial competitors commonly use “request a proposal” or “request a walkthrough,” identify property types, and collect site details. Several use very long forms. | Match the buyer’s procurement language while reducing form friction. | “Request a walkthrough” is the core CTA; four compact inputs qualify the opportunity without a multi-screen RFP form. |
| Web Vitals defines LCP, INP, and CLS as the stable user-experience metrics. | The hero must be responsive and lightweight enough to avoid slowing the first interaction. | Generated hero was resized/compressed to a 1600px JPEG; dimensions and high fetch priority are declared to reduce layout instability and load delay. |
| Vercel supports custom events through `track()` for button and form interactions. | The funnel should be measurable, not judged only by visual preference. | Proposal starts and commercial phone clicks are tracked without sending address or other personal data to analytics. |

## Competitive pattern review

- Natural Tech Sacramento uses a commercial proposal CTA and speaks directly to HOA boards, management companies, facility directors, and property owners. It also answers procurement questions such as licenses, insurance, timelines, and certificates. EDH should add those only after the facts and documents are verified.
- U.S. Lawns Sacramento qualifies property type, address, budget, and number of properties, but its long form introduces friction. EDH’s first-touch form intentionally captures less and moves detailed qualification into the conversation.
- Gavino Landscaping uses parallel “Get a Proposal” and “Request a Walkthrough” actions and leads with commercial, multi-family, industrial, and HOA fit. This supports property-specific CTA language.
- Terracare clearly separates commercial/HOA work from residential and presents an RFP path. EDH now keeps residential promotional pricing off the commercial page and describes commercial pricing as property-specific.
- The Grounds Company publishes an explicit response window and emphasizes phone for urgent needs. EDH should set a truthful response-time promise only after its internal lead-handling workflow can consistently meet it.

## Operating actions required after launch

1. Route every proposal text/call to a named owner and respond as quickly as the business can reliably sustain. The page cannot compensate for slow follow-up.
2. Ask completed customers for specific, honest Google reviews; reply to every review. Never gate, buy, or script fake reviews.
3. Photograph actual commercial/HOA work and replace the generated general hero when a strong, permission-cleared portfolio exists.
4. Confirm California contractor license, insurance, service capacity, contract minimums, and any COI/additional-insured process before publishing those trust claims.
5. Keep Google Business Profile category, services, phone, hours, website, and service areas complete and consistent. Add new photos regularly.
6. In Search Console, inspect and request indexing for `/commercial-hoa`, submit the canonical sitemap, and validate the page’s structured data.
7. Review Vercel events monthly: commercial page visits → proposal starts → phone clicks. Pair this with a simple lead sheet that records qualified proposals, wins, loss reason, contract value, and source.

## Sources

- Google Business Profile Help, [Tips to improve your local ranking on Google](https://support.google.com/business/answer/7091)
- Google Search Central, [LocalBusiness structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- Google Search Central, [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- Google Search Central, [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- web.dev, [Web Vitals](https://web.dev/articles/vitals)
- Vercel, [Tracking custom events](https://vercel.com/docs/analytics/custom-events)
- Jobber, [2026 Home Service Trends Report](https://www.getjobber.com/home-service-trends-report/)
- BrightLocal, [Local Consumer Review Survey 2025](https://www.brightlocal.com/research/local-consumer-review-survey-2025/)
- Natural Tech, [Commercial Landscaping in Sacramento](https://www.naturaltechartificialgrass.com/services/turf-supplier-sacramento/commercial-landscaping-sacramento)
- U.S. Lawns Sacramento, [Commercial landscape enhancements](https://uslawns.com/locations/ca/sacramento/landscape-enhancements/)
- Gavino Landscaping, [Commercial, multi-family, and HOA landscape maintenance](https://gavinolandscaping.com/)
- Terracare Associates, [Commercial landscape request for proposal](https://myterracare.com/request-for-proposal/)
- The Grounds Company, [Sacramento commercial landscapers contact page](https://thegroundsco.com/contact-us/)

## Claim ledger

- High confidence: Google local ranking is mainly relevance, distance, and prominence; source is Google Business Profile Help.
- High confidence: LocalBusiness markup can describe business details and should be validated; source is Google Search Central.
- High confidence: Google AI search features require no special AI markup; source is Google Search Central.
- Medium confidence: Review behavior and response-time percentages are survey results and may vary by audience; sources and survey populations are named above.
- Medium confidence: Proposal/walkthrough language is a repeated competitor pattern, not proof of causal conversion lift.
- Inference: A shorter commercial qualification form should reduce friction relative to competitor RFP forms; this is a design inference and should be validated with funnel events and lead quality.
