import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import type { AuthType } from "../lib/auth.js";
import { protectRoute } from "../middleware/auth.js";

const prisma = new PrismaClient();
const app = new Hono<{ Variables: AuthType }>();

// Get all organizations for the current user
app.get("/", protectRoute, async (c) => {
  const user = c.get("user");
  
  try {
    const organizations = await prisma.organization.findMany({
      where: {
        Member: {
          some: {
            userId: user!.id
          }
        }
      },
      include: {
        Member: {
          where: {
            userId: user!.id
          }
        }
      }
    });

    return c.json(organizations);
  } catch (error) {
    console.error("Error fetching organizations:", error);
    return c.json({ error: "Failed to fetch organizations" }, 500);
  }
});

// Get organization by ID with full details
app.get("/:id", protectRoute, async (c) => {
  const organizationId = c.req.param("id");
  const user = c.get("user");

  try {
    const organization = await prisma.organization.findFirst({
      where: {
        id: organizationId,
        Member: {
          some: {
            userId: user!.id
          }
        }
      },
      include: {
        Member: true,
        Invitation: true,
        FamilyMember: true,
      }
    });

    if (!organization) {
      return c.json({ error: "Organization not found" }, 404);
    }

    return c.json(organization);
  } catch (error) {
    console.error("Error fetching organization:", error);
    return c.json({ error: "Failed to fetch organization" }, 500);
  }
});

// Update organization name
app.put("/:id", protectRoute, async (c) => {
  const organizationId = c.req.param("id");
  const user = c.get("user");
  const { name, slug } = await c.req.json();

  try {
    // Check if user has permission to update
    const member = await prisma.member.findFirst({
      where: {
        organizationId,
        userId: user!.id,
        role: { in: ["owner", "admin"] }
      }
    });

    if (!member) {
      return c.json({ error: "Insufficient permissions" }, 403);
    }

    const organization = await prisma.organization.update({
      where: { id: organizationId },
      data: { name, slug }
    });

    return c.json(organization);
  } catch (error) {
    console.error("Error updating organization:", error);
    return c.json({ error: "Failed to update organization" }, 500);
  }
});

export default app;