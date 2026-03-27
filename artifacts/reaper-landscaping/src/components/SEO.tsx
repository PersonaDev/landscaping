import { Helmet } from "react-helmet-async";

export function SEO() {
  const title = "Reaper Landscaping | El Dorado Hills Lawn Mowing & Grass Cutting | $60/mo";
  const description =
    "Affordable lawn mowing and grass cutting in El Dorado Hills, CA. $60/month bi-weekly backyard cuts. Serving Sacramento, Folsom, Granite Bay, Rocklin & more. Call (916) 847-2095.";
  const keywords =
    "El Dorado Hills mowing, El Dorado Hills landscaping, El Dorado Hills grass cutting, cheap grass cutting El Dorado Hills, cheap landscaper El Dorado Hills, gardener El Dorado Hills, cheap gardener Sacramento, lawn care El Dorado Hills, lawn mowing Sacramento, landscaping near me, grass cutting near me, affordable landscaper Sacramento, affordable lawn mowing, bi weekly grass cut, backyard mowing service, El Dorado County landscaping, Folsom lawn care, Granite Bay landscaping, Rocklin grass cutting, Roseville lawn mowing, cheap lawn service Sacramento, $60 lawn mowing";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Reaper Landscaping",
    "description": description,
    "telephone": "+19168472095",
    "priceRange": "$",
    "areaServed": [
      "El Dorado Hills, CA",
      "Folsom, CA",
      "Granite Bay, CA",
      "Roseville, CA",
      "Rocklin, CA",
      "Sacramento, CA",
      "El Dorado County, CA"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "El Dorado Hills",
      "addressRegion": "CA",
      "addressCountry": "US"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Landscaping Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Bi-Weekly Backyard Grass Cutting Subscription",
            "description": "Bi-weekly backyard grass cuts for $60/month. No contracts."
          },
          "price": "60",
          "priceCurrency": "USD"
        }
      ]
    },
    "serviceType": [
      "Lawn Mowing",
      "Grass Cutting",
      "Landscaping",
      "Yard Cleanup",
      "Weed Control",
      "Garden Maintenance"
    ]
  };

  return (
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="geo.region" content="US-CA" />
      <meta name="geo.placename" content="El Dorado Hills" />
      <link rel="canonical" href="https://reaperlandscaping.com/" />

      {/* Open Graph / Social */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Reaper Landscaping" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* Viewport & Theme */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#0a0a0a" />

      {/* Structured Data for Google */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}
