import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import type { AuthType } from "../lib/auth.js";
import { protectRoute } from "../middleware/auth.js";

const prisma = new PrismaClient();
const app = new Hono<{ Variables: AuthType }>();

// Get all family members for an organization
app.get("/:organizationId", protectRoute, async (c) => {
  const organizationId = c.req.param("organizationId");
  const user = c.get("user");

  try {
    // Check if user has access to this organization
    const member = await prisma.member.findFirst({
      where: {
        organizationId,
        userId: user!.id
      }
    });

    if (!member) {
      return c.json({ error: "Access denied" }, 403);
    }

    const familyMembers = await prisma.familyMember.findMany({
      where: { organizationId },
      orderBy: { firstName: 'asc' }
    });

    return c.json(familyMembers);
  } catch (error) {
    console.error("Error fetching family members:", error);
    return c.json({ error: "Failed to fetch family members" }, 500);
  }
});

// Create a new family member
app.post("/:organizationId", protectRoute, async (c) => {
  const organizationId = c.req.param("organizationId");
  const user = c.get("user");
  const { firstName, lastName, email } = await c.req.json();

  try {
    // Check if user has permission to add members
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

    const familyMember = await prisma.familyMember.create({
      data: {
        organizationId,
        firstName,
        lastName,
        email: email || null
      }
    });

    return c.json(familyMember);
  } catch (error) {
    console.error("Error creating family member:", error);
    return c.json({ error: "Failed to create family member" }, 500);
  }
});

// Get user role in organization
app.get("/:organizationId/role", protectRoute, async (c) => {
  const organizationId = c.req.param("organizationId");
  const user = c.get("user");

  try {
    const member = await prisma.member.findFirst({
      where: {
        organizationId,
        userId: user!.id
      }
    });

    return c.json({ role: member?.role || null });
  } catch (error) {
    console.error("Error fetching user role:", error);
    return c.json({ error: "Failed to fetch user role" }, 500);
  }
});

export default app;