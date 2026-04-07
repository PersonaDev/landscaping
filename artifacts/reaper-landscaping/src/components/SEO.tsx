import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
}

export function SEO({ title, description }: SEOProps) {
  const siteUrl = "https://landscaping.greywhale.dev";
  const defaultTitle = "EDH Landscaping | El Dorado Hills Lawn Care | $60/mo";
  const defaultDesc =
    "Affordable lawn care in El Dorado Hills, CA. Bi-weekly yard service starting at $60/mo. Same crew every visit. Serving El Dorado Hills, Folsom, Granite Bay, Roseville, Rocklin & more. Call or text (916) 847-2095.";

  const resolvedTitle = title ?? defaultTitle;
  const resolvedDesc = description ?? defaultDesc;
  const ogImage = `${siteUrl}/og-image.svg`;

  const keywords =
    "El Dorado Hills landscaping, El Dorado Hills lawn care, El Dorado Hills lawn mowing, EDH landscaping, grass cutting El Dorado Hills, lawn service Folsom, yard care Granite Bay, Roseville lawn mowing, Rocklin landscaping, affordable lawn care Sacramento, bi-weekly lawn service, lawn maintenance El Dorado Hills, El Dorado County landscaping, $60 lawn service, no contract lawn care";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "EDH Landscaping",
    url: siteUrl,
    description: resolvedDesc,
    telephone: "+19168472095",
    priceRange: "$",
    image: ogImage,
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
    sameAs: [
      "https://greywhale.dev",
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
      <meta name="geo.position" content="38.6879;-121.0533" />
      <meta name="ICBM" content="38.6879, -121.0533" />
      <link rel="canonical" href={siteUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDesc} />
      <meta property="og:site_name" content="EDH Landscaping" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="EDH Landscaping — El Dorado Hills lawn care starting at $60/mo" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDesc} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content="EDH Landscaping — El Dorado Hills lawn care starting at $60/mo" />

      {/* Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#1a5c30" />

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
}
