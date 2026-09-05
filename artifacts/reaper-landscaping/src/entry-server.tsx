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
  const appHtml = renderToString(
    <App ssrPath={url} helmetContext={helmetContext as Record<string, unknown>} />,
  );
  const helmet = helmetContext.helmet;
  const head = [
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
