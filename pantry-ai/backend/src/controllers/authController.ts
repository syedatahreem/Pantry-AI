import type { Request, Response } from "express";
import * as authService from "../services/authService.js";

const MIN_PASSWORD_LENGTH = 8;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function register(req: Request, res: Response) {
  const { email, password } = req.body;

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    res.status(400).json({ error: "A valid email is required" });
    return;
  }
  if (typeof password !== "string" || password.length < MIN_PASSWORD_LENGTH) {
    res.status(400).json({ error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters` });
    return;
  }

  try {
    const result = await authService.register(email.trim().toLowerCase(), password);
    res.status(201).json(result);
  } catch (err) {
    if (err instanceof authService.AuthError) {
      res.status(409).json({ error: err.message });
      return;
    }
    throw err;
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (typeof email !== "string" || typeof password !== "string") {
    res.status(400).json({ error: "email and password are required" });
    return;
  }

  try {
    const result = await authService.login(email.trim().toLowerCase(), password);
    res.json(result);
  } catch (err) {
    if (err instanceof authService.AuthError) {
      res.status(401).json({ error: err.message });
      return;
    }
    throw err;
  }
}
