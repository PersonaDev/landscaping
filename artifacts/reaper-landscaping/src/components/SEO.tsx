import { Helmet } from "react-helmet-async";
import { FAQ_ITEMS } from "./FAQAccordion";

export const SITE_URL = "https://www.edhlandscaping.com";

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  pageType?: "website" | "article";
  image?: string;
  includeFaq?: boolean;
  noIndex?: boolean;
  article?: {
    publishedAt?: string | null;
    modifiedAt?: string | null;
  };
}

const DEFAULT_TITLE = "EDH Landscaping | El Dorado Hills Lawn Care";
const DEFAULT_DESCRIPTION =
  "Reliable lawn care and yard maintenance in El Dorado Hills, Folsom, and nearby communities. Recurring service starts at $45 per month. Call or text (916) 847-2095.";

const SERVICE_AREAS = [
  "El Dorado Hills",
  "Folsom",
  "Granite Bay",
  "Roseville",
  "Rocklin",
  "Sacramento",
  "Cameron Park",
  "Shingle Springs",
];

function normalizePath(path: string) {
  if (!path || path === "/") return "/";
  return `/${path.replace(/^\/+|\/+$/g, "")}`;
}

export function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  pageType = "website",
  image = "/opengraph.jpg",
  includeFaq = false,
  noIndex = false,
  article,
}: SEOProps) {
  const canonicalPath = normalizePath(path);
  const canonicalUrl = `${SITE_URL}${canonicalPath === "/" ? "" : canonicalPath}`;
  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  const business = {
    "@type": ["HomeAndConstructionBusiness", "LocalBusiness"],
    "@id": `${SITE_URL}/#business`,
    name: "EDH Landscaping",
    alternateName: "El Dorado Hills Landscaping",
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    telephone: "+1-916-847-2095",
    priceRange: "$",
    image: imageUrl,
    logo: `${SITE_URL}/logo.svg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "El Dorado Hills",
      addressRegion: "CA",
      postalCode: "95762",
      addressCountry: "US",
    },
    areaServed: SERVICE_AREAS.map((name) => ({
      "@type": "City",
      name: `${name}, CA`,
    })),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-916-847-2095",
      contactType: "customer service",
      areaServed: "US-CA",
      availableLanguage: "English",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Lawn care and yard maintenance services",
      itemListElement: [
        "Recurring lawn mowing",
        "Edging and trimming",
        "Yard cleanup",
        "Weed control",
        "Garden bed care",
        "Shrub trimming",
        "Sprinkler and drip repair",
        "Mulch installation",
      ].map((name) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name,
          provider: { "@id": `${SITE_URL}/#business` },
          areaServed: "El Dorado Hills and Greater Sacramento, California",
        },
      })),
    },
  };

  const webpage = {
    "@type": pageType === "article" ? "Article" : "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: title,
    description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#business` },
    primaryImageOfPage: { "@id": `${canonicalUrl}#primaryimage` },
    ...(pageType === "article" && article?.publishedAt
      ? { datePublished: article.publishedAt }
      : {}),
    ...(pageType === "article" && article?.modifiedAt
      ? { dateModified: article.modifiedAt }
      : {}),
  };

  const graph: Record<string, unknown>[] = [
    business,
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "EDH Landscaping",
      publisher: { "@id": `${SITE_URL}/#business` },
      inLanguage: "en-US",
    },
    {
      "@type": "ImageObject",
      "@id": `${canonicalUrl}#primaryimage`,
      url: imageUrl,
      contentUrl: imageUrl,
      caption: "EDH Landscaping lawn care in El Dorado Hills, California",
    },
    webpage,
  ];

  if (includeFaq) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${canonicalUrl}#faq`,
      mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    });
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large"} />
      <meta name="geo.region" content="US-CA" />
      <meta name="geo.placename" content="El Dorado Hills" />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content={pageType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="EDH Landscaping" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="EDH Landscaping lawn care in El Dorado Hills" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content="EDH Landscaping lawn care in El Dorado Hills" />

      <meta name="theme-color" content="#006837" />
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
}
