import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { authMiddleware } from "./middleware/auth.js";
import { auth } from "./lib/auth.js";
import type { AuthType } from "./lib/auth.js";
import { handleError, createSuccessResponse } from "./lib/errors.js";
import organizationsRoutes from "./routes/organizations.js";
import familyMembersRoutes from "./routes/family-members.js";

const app = new Hono<{ Variables: AuthType }>();

app.use(
  "*",
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:5173",
      "http://localhost:3000"
    ],
    credentials: true,
  }),
);

app.use("*", logger());
app.use("*", authMiddleware);

app
  .basePath("/api")
  .get("/healthcheck", (c) => c.json(createSuccessResponse("Server is running")))
  .get("/me", async (c) => {
    try {
      const user = c.get("user");
      const session = c.get("session");
      
      if (!user || !session) {
        return c.json({ success: false, error: { code: "UNAUTHORIZED", message: "Not authenticated" } }, 401);
      }
      
      return c.json(createSuccessResponse({ user, session }));
    } catch (error) {
      return handleError(error, c);
    }
  })
  .route("/organizations", organizationsRoutes)
  .route("/family-members", familyMembersRoutes)
  .on(["POST", "GET"], "/auth/*", async (c) => auth.handler(c.req.raw));

export default app;