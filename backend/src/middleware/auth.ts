import type { Context, Next } from "hono";
import { auth, type AuthType } from "../lib/auth.js";

export const authMiddleware = async (
  c: Context<{ Variables: AuthType }>,
  next: Next,
) => {
  try {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    c.set("user", session?.user || null);
    c.set("session", session?.session || null);
  } catch (error) {
    console.error("Auth middleware error:", error);
    c.set("user", null);
    c.set("session", null);
  }
  await next();
};

export const protectRoute = async (
  c: Context<{ Variables: AuthType }>,
  next: Next,
) => {
  const session = c.get("session");
  if (!session) {
    return c.json(
      {
        error: "Unauthorized",
        message: "You must be signed in to access this resource",
      },
      401,
    );
  }
  await next();
};