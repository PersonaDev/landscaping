import { Router } from "express";
import { verifyPassword, signToken } from "../lib/auth.js";

const router = Router();

router.post("/auth/login", (req, res) => {
  const { password } = req.body as { password?: string };
  if (!password || !verifyPassword(password)) {
    res.status(401).json({ error: "Invalid password" });
    return;
  }
  res.json({ token: signToken() });
});

export default router;
