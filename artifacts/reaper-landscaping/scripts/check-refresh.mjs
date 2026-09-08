import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const app = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, app), "utf8");
const canonical = "https://www.edhlandscaping.com";
const require = createRequire(import.meta.url);
const scheduledPosts = require("../../../api/scheduled-posts.js");
const apiHandler = await read("../../api/handler.js");
const vercelConfig = await read("../../vercel.json");
for (const route of ["", "services/", "testimonials/", "blog/", "commercial-hoa/"]) {
  const html = await read(`dist/public/${route}index.html`);
  const url = canonical + (route ? `/${route.slice(0, -1)}` : "");
  assert.ok(html.includes(`rel="canonical" href="${url}"`), `Canonical: ${route}`);
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `One H1: ${route}`);
  assert.ok(html.includes("application/ld+json"), `Structured data: ${route}`);
  assert.ok(!/<meta[^>]+name="robots"[^>]+noindex/.test(html), `Indexable: ${route}`);
}
const home = await read("dist/public/index.html");
assert.ok(home.includes("Regular monthly price"), "Discounted homepage pricing prerendered");
assert.ok(home.includes("Map of the EDH Landscaping service area"), "Service-area map shell prerendered");
assert.ok(!home.includes("<em>"), "No italic headline emphasis");
assert.ok(!/field notes/i.test(home), "Blog is labeled plainly");
assert.ok(home.includes("$40"), "Rounded first-month discount rendered");
assert.ok(home.includes("Claim 10% off"), "Mobile conversion action prerendered");
assert.ok(home.includes("FAQPage"), "FAQ structured data retained");
assert.ok(home.includes("LocalBusiness"), "Business entity retained");
assert.ok(home.includes("https://www.google.com/preferences/source?q=www.edhlandscaping.com"), "Preferred source uses production domain");
for (const match of home.matchAll(/src="(\/[^"?]+)"/g)) {
  await access(fileURLToPath(new URL(`dist/public${match[1]}`, app)));
}
for (const path of ["robots.txt", "sitemap.xml", "llms.txt"]) {
  assert.equal(await read(`public/${path}`), await read(`dist/public/${path}`), `${path} preserved`);
}
const commercial = await read("dist/public/commercial-hoa/index.html");
assert.ok(commercial.includes('id="property-quote"'), "Commercial form rendered");
assert.ok(commercial.includes("Residential promotional pricing does not apply."), "Separate pricing");
assert.ok(home.includes('href="/commercial-hoa"'), "Homepage link");
assert.ok(scheduledPosts.length >= 12, "At least one quarter of weekly articles");
assert.equal(new Set(scheduledPosts.map((post) => post.slug)).size, scheduledPosts.length, "Unique article slugs");
for (const post of scheduledPosts) {
  assert.ok(post.title.length >= 25, `Substantive title: ${post.slug}`);
  assert.ok(post.excerpt.length >= 80, `Useful excerpt: ${post.slug}`);
  assert.ok(post.body.length >= 1500, `Substantive article: ${post.slug}`);
  assert.ok(post.body.includes('href="/'), `Internal conversion link: ${post.slug}`);
  assert.ok(!/lorem ipsum|guaranteed rankings|best landscaper/i.test(post.body), `No filler claims: ${post.slug}`);
  assert.ok(!post.body.includes("—") && !post.excerpt.includes("—"), `No em dashes: ${post.slug}`);
}
assert.ok((await read("public/robots.txt")).includes("/api/sitemap.xml"), "Dynamic article sitemap advertised");
assert.ok(apiHandler.includes("published_at <= NOW()"), "Future articles remain private until due");
assert.ok(apiHandler.includes('app.get("/api/sitemap.xml"'), "Dynamic article sitemap route exists");
assert.ok(apiHandler.includes('app.get("/api/feed.xml"'), "RSS feed route exists");
assert.ok(vercelConfig.includes("sitemap\\\\.xml|feed\\\\.xml"), "Feed and sitemap avoid API noindex header");
console.log("PASS: five prerendered routes, commercial form, canonicals, headings, schema, assets and crawl files.");
