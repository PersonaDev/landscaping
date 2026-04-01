import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
}

export function SEO({ title, description }: SEOProps) {
  const defaultTitle = "EDH Landscaping | El Dorado Hills Lawn Care | $60/mo";
  const defaultDesc =
    "Affordable lawn care in El Dorado Hills, CA. Bi-weekly yard service starting at $60/mo. Same crew every visit. Serving El Dorado Hills, Folsom, Granite Bay, Roseville, Rocklin & more. Call (916) 847-2095.";

  const resolvedTitle = title ?? defaultTitle;
  const resolvedDesc = description ?? defaultDesc;

  const keywords =
    "El Dorado Hills landscaping, El Dorado Hills lawn care, El Dorado Hills lawn mowing, EDH landscaping, grass cutting El Dorado Hills, lawn service Folsom, yard care Granite Bay, Roseville lawn mowing, Rocklin landscaping, affordable lawn care Sacramento, bi-weekly lawn service, lawn maintenance El Dorado Hills, El Dorado County landscaping";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "EDH Landscaping",
    description: resolvedDesc,
    telephone: "+19168472095",
    priceRange: "$",
    areaServed: [
      "El Dorado Hills, CA",
      "Folsom, CA",
      "Granite Bay, CA",
      "Roseville, CA",
      "Rocklin, CA",
      "Sacramento, CA",
      "Cameron Park, CA",
      "Shingle Springs, CA",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "El Dorado Hills",
      addressRegion: "CA",
      postalCode: "95762",
      addressCountry: "US",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Landscaping Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Bi-Weekly Yard Service",
            description: "Bi-weekly yard maintenance starting at $60/month. No contracts.",
          },
          price: "60",
          priceCurrency: "USD",
        },
      ],
    },
    serviceType: [
      "Lawn Mowing",
      "Edging & Trimming",
      "Weed Control",
      "Garden Bed Care",
      "Yard Cleanup",
      "Driveway Blowout",
    ],
  };

  return (
    <Helmet>
      <html lang="en" />
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDesc} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="geo.region" content="US-CA" />
      <meta name="geo.placename" content="El Dorado Hills" />
      <link rel="canonical" href="https://greywhale.dev/" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDesc} />
      <meta property="og:site_name" content="EDH Landscaping" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDesc} />

      {/* Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#1a5c30" />

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
}
