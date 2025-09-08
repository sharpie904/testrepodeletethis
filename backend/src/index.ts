import { serve } from "@hono/node-server";
import app from "./app.js";

const port = parseInt(process.env.PORT || "3000");

serve(
  {
    fetch: app.fetch,
    port,
  },
  (info) => {
    console.log(`🚀 Backend server is running on http://localhost:${info.port}`);
  },
);