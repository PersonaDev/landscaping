# EDH Landscaping Content Calendar

The production API seeds these articles into Postgres on deployment. Each post is marked published but remains private until its `published_at` date. At that time it automatically appears on the blog, in the article sitemap, and in the RSS feed. No weekly deployment or cron job is required.

All times below are 7:30 a.m. Pacific.

| Publish date | Article | Primary search intent | Conversion path |
| --- | --- | --- | --- |
| September 9, 2026 | September Yard Checklist for El Dorado Hills Homes | Seasonal residential maintenance | Residential estimate |
| September 16, 2026 | 7 Signs Your Sprinkler or Drip System Needs Attention | Irrigation diagnosis | Residential estimate |
| September 23, 2026 | What Should Be Included in Recurring Lawn Service? | Service comparison | Residential estimate |
| September 30, 2026 | Fall Yard Cleanup: What to Do Before the First Heavy Rain | Fall cleanup planning | Residential estimate |
| October 7, 2026 | HOA Landscape Maintenance: A Practical Scope Checklist | HOA vendor selection | Commercial walkthrough |
| October 14, 2026 | Water-Wise Landscaping Without Turning Your Yard Into Gravel | Water-efficient landscape planning | Residential estimate |
| October 21, 2026 | How Often Should Lawn Care Be Scheduled? | Maintenance frequency | Residential estimate |
| October 28, 2026 | Commercial Landscape Walkthrough Checklist for Property Managers | Commercial procurement | Commercial walkthrough |
| November 4, 2026 | Mulch in El Dorado Hills: Benefits and Common Mistakes | Mulch installation | Residential estimate |
| November 11, 2026 | How to Compare Landscaping Quotes Without Comparing the Wrong Things | Quote evaluation | Residential estimate |
| November 18, 2026 | Winter Landscape Maintenance in the Sacramento Foothills | Winter service planning | Residential estimate |
| November 25, 2026 | Defensible Space vs. Routine Landscaping: What Each Service Covers | Wildfire-preparedness education | Residential estimate |
| December 2, 2026 | Build Your 2027 Landscape Maintenance Plan Before Spring | Annual planning | Residential or commercial inquiry |

## Editorial guardrails

- Publish useful answers written for local property owners and managers; do not manufacture reviews, project results, licenses, awards, or rankings.
- Confirm seasonal advice and regulation-sensitive claims against primary sources before editing.
- Keep one clear page topic, descriptive headings, an accurate excerpt, and a helpful internal next step.
- Update strong articles when local guidance changes instead of creating near-duplicate city or keyword pages.
- Add real project photographs and first-hand examples when available; they strengthen trust more than extra generic prose.

## Discovery endpoints

- Article sitemap: `https://www.edhlandscaping.com/api/sitemap.xml`
- RSS feed: `https://www.edhlandscaping.com/api/feed.xml`
- Blog: `https://www.edhlandscaping.com/blog`

After deployment, submit the article sitemap in Google Search Console. The static site sitemap remains valid and is advertised alongside it in `robots.txt`.
