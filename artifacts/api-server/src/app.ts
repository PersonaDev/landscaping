import express, { type Express, type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import path from "path";
import { createProxyMiddleware } from "http-proxy-middleware";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

// The API server always runs behind a single reverse proxy (Replit's
// edge in dev, the deployment edge in prod). Trusting one hop lets
// Express derive req.ip from X-Forwarded-For without letting clients
// spoof the value (an attacker-supplied X-Forwarded-For entry sits to
// the left of the proxy-appended real IP, so it is ignored).
app.set("trust proxy", 1);

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

if (process.env.NODE_ENV === "production" && !process.env.VERCEL) {
  // Self-hosted production: serve the built React app for all non-API routes
  const frontendDist = path.join(process.cwd(), "artifacts/reaper-landscaping/dist/public");
  app.use(express.static(frontendDist));
  app.get("*", (_req: Request, res: Response) => {
    res.sendFile(path.join(frontendDist, "index.html"));
  });
} else if (!process.env.VERCEL) {
  // In development, proxy non-API requests to the Vite dev server
  const vitePort = process.env.VITE_PORT ?? "25775";
  app.use(
    createProxyMiddleware({
      target: `http://localhost:${vitePort}`,
      changeOrigin: true,
      ws: true,
    }),
  );
}

// Global error handler — always return JSON so the client can parse it
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  logger.error(err);
  res.status(500).json({ error: "Internal server error" });
});

export default app;
