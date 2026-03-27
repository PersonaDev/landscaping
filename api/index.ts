import type { IncomingMessage, ServerResponse } from "node:http";
import type { RequestHandler } from "express";
import app from "../artifacts/api-server/src/app";

const handler: RequestHandler = app as unknown as RequestHandler;

export default function vercelHandler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  const matchedPath = req.headers["x-matched-path"];
  if (typeof matchedPath === "string" && matchedPath) {
    const qsStart = req.url?.indexOf("?") ?? -1;
    const qs = qsStart >= 0 ? req.url!.slice(qsStart) : "";
    req.url = matchedPath + qs;
  }
  handler(req as Parameters<RequestHandler>[0], res as Parameters<RequestHandler>[1], () => {
    res.statusCode = 404;
    res.end("Not found");
  });
}
