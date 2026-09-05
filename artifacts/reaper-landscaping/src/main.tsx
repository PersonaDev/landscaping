import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { setBaseUrl } from "@workspace/api-client-react";

setBaseUrl(import.meta.env.VITE_API_URL ?? "");

const root = document.getElementById("root")!;

if (root.hasChildNodes()) {
  hydrateRoot(root, <App />);
} else {
  createRoot(root).render(<App />);
}
