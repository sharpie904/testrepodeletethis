import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { authMiddleware, protectRoute } from "./middleware.js";
import { auth } from "./lib/auth.js";
import type { AuthType } from "./lib/auth.js";

const app = new Hono<{ Variables: AuthType }>();

app.use(
  "*",
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  }),
);

app.use("*", logger());
app.use("*", authMiddleware);

console.log("done");

app
  .basePath("/api")
  .get("/healthcheck", (c) => c.text("aye aye chief"))
  .get("/me", protectRoute, (c) => {
    const user = c.get("user");
    return c.json({ user }, 200);
  })
  .on(["POST", "GET"], "/auth/*", async (c) => auth.handler(c.req.raw));

export default app;
