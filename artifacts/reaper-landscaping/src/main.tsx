import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { setBaseUrl } from "@workspace/api-client-react";

setBaseUrl(import.meta.env.VITE_API_URL ?? "");

const root = document.getElementById("root")!;

// React 19 hoists document metadata during SSR. The prerender remains fully
// crawlable, while mounting the client app cleanly avoids attempting to
// hydrate head resources as children of the application root.
createRoot(root).render(<App />);
