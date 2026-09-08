import { renderToString } from "react-dom/server";
import App from "./App";
import "./index.css";

interface HelmetOutput {
  title?: { toString(): string };
  meta?: { toString(): string };
  link?: { toString(): string };
  script?: { toString(): string };
  style?: { toString(): string };
  noscript?: { toString(): string };
}

export function render(url: string) {
  const helmetContext: { helmet?: HelmetOutput } = {};
  const renderedHtml = renderToString(
    <App ssrPath={url} helmetContext={helmetContext as Record<string, unknown>} />,
  );
  const helmet = helmetContext.helmet;
  // React 19 hoists title/meta/link elements from Helmet to the beginning of
  // renderToString output instead of populating HelmetProvider's context.
  // Split that head prefix from the hydrated application markup so prerendered
  // documents contain valid metadata and the client hydrates the actual app.
  const appStart = renderedHtml.search(/<!--\$--><div|<div class=/);
  const reactHead = appStart > 0 ? renderedHtml.slice(0, appStart) : "";
  let appHtml = appStart > 0 ? renderedHtml.slice(appStart) : renderedHtml;
  const structuredData = appHtml.match(
    /<script type="application\/ld\+json" data-edh-seo="true">[\s\S]*?<\/script>/,
  )?.[0];
  if (structuredData) appHtml = appHtml.replace(structuredData, "");
  const head = [
    reactHead,
    structuredData,
    helmet?.title?.toString(),
    helmet?.meta?.toString(),
    helmet?.link?.toString(),
    helmet?.style?.toString(),
    helmet?.script?.toString(),
    helmet?.noscript?.toString(),
  ]
    .filter(Boolean)
    .join("\n");

  return { appHtml, head };
}
