import { Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/auth/login", (req, res) => {
  const { password } = req.body as { password?: string };
  const adminPassword = process.env.ADMIN_PASSWORD;
  const jwtSecret = process.env.SESSION_SECRET;

  if (!jwtSecret) {
    res.status(500).json({ error: "Server configuration error" });
    return;
  }
  if (!password || !adminPassword || password !== adminPassword) {
    res.status(401).json({ error: "Invalid password" });
    return;
  }

  const token = jwt.sign({ admin: true }, jwtSecret, { expiresIn: "7d" });
  res.json({ token });
});

router.get("/auth/verify", (req, res) => {
  const auth = req.headers.authorization;
  const jwtSecret = process.env.SESSION_SECRET;

  if (!jwtSecret) {
    res.status(500).json({ error: "Server configuration error" });
    return;
  }
  if (!auth?.startsWith("Bearer ")) {
    res.status(401).json({ error: "No token provided" });
    return;
  }

  const token = auth.slice(7);
  try {
    jwt.verify(token, jwtSecret);
    res.json({ valid: true });
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
});

export default router;
