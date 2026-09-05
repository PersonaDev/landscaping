import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = resolve(projectDir, "dist/public");
const template = await readFile(resolve(publicDir, "index.html"), "utf8");
const { render } = await import("../dist/server/entry-server.js");

const routes = ["/", "/services", "/testimonials", "/blog"];

for (const route of routes) {
  const { appHtml, head } = render(route);
  const html = template
    .replace("<!--app-head-->", head)
    .replace("<!--app-html-->", appHtml);
  const outputPath = route === "/"
    ? resolve(publicDir, "index.html")
    : resolve(publicDir, route.slice(1), "index.html");

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html, "utf8");
}

console.log(`Prerendered ${routes.length} public routes.`);
