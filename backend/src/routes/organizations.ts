import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import type { AuthType } from "../lib/auth.js";
import { protectRoute } from "../middleware/auth.js";
import { handleError, createSuccessResponse, createAppError } from "../lib/errors.js";
import { validateSchema, CreateOrganizationSchema, UpdateOrganizationSchema } from "shared";
import type { OrganizationWithMembers } from "shared";

const prisma = new PrismaClient();
const app = new Hono<{ Variables: AuthType }>();

// Get all organizations for the current user
app.get("/", protectRoute, async (c) => {
  try {
    const user = c.get("user");
    
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

    // Transform dates for JSON serialization
    const transformedOrgs = organizations.map(org => ({
      ...org,
      createdAt: org.createdAt.toISOString(),
      Member: org.Member.map(member => ({
        ...member,
        createdAt: member.createdAt.toISOString(),
      }))
    }));

    return c.json(createSuccessResponse(transformedOrgs));
  } catch (error) {
    return handleError(error, c);
  }
});

// Get organization by ID with full details
app.get("/:id", protectRoute, async (c) => {
  try {
    const organizationId = c.req.param("id");
    const user = c.get("user");

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
      throw createAppError('NOT_FOUND', 'Organization not found');
    }

    // Transform dates for JSON serialization
    const transformedOrg = {
      ...organization,
      createdAt: organization.createdAt.toISOString(),
      Member: organization.Member.map(member => ({
        ...member,
        createdAt: member.createdAt.toISOString(),
      })),
      Invitation: organization.Invitation.map(inv => ({
        ...inv,
        expiresAt: inv.expiresAt.toISOString(),
      })),
      FamilyMember: organization.FamilyMember.map(fm => ({
        ...fm,
        createdAt: fm.createdAt.toISOString(),
        updatedAt: fm.updatedAt.toISOString(),
      })),
    };

    return c.json(createSuccessResponse(transformedOrg));
  } catch (error) {
    return handleError(error, c);
  }
});

// Create new organization
app.post("/", protectRoute, async (c) => {
  try {
    const user = c.get("user");
    const body = await c.req.json();
    
    const validatedData = validateSchema(CreateOrganizationSchema, body);

    // Check if slug already exists
    const existingOrg = await prisma.organization.findUnique({
      where: { slug: validatedData.slug }
    });

    if (existingOrg) {
      throw createAppError('ALREADY_EXISTS', 'An organization with this slug already exists');
    }

    const organization = await prisma.organization.create({
      data: {
        name: validatedData.name,
        slug: validatedData.slug,
        Member: {
          create: {
            userId: user!.id,
            email: user!.email,
            role: 'owner',
          }
        }
      },
      include: {
        Member: true,
      }
    });

    const transformedOrg = {
      ...organization,
      createdAt: organization.createdAt.toISOString(),
      Member: organization.Member.map(member => ({
        ...member,
        createdAt: member.createdAt.toISOString(),
      }))
    };

    return c.json(createSuccessResponse(transformedOrg, 'Organization created successfully'));
  } catch (error) {
    return handleError(error, c);
  }
});

// Update organization
app.put("/:id", protectRoute, async (c) => {
  try {
    const organizationId = c.req.param("id");
    const user = c.get("user");
    const body = await c.req.json();
    
    const validatedData = validateSchema(UpdateOrganizationSchema, body);

    // Check if user has permission to update
    const member = await prisma.member.findFirst({
      where: {
        organizationId,
        userId: user!.id,
        role: { in: ["owner", "admin"] }
      }
    });

    if (!member) {
      throw createAppError('INSUFFICIENT_PERMISSIONS', 'You do not have permission to update this organization');
    }

    // Check if new slug already exists (if provided)
    if (validatedData.slug) {
      const existingOrg = await prisma.organization.findFirst({
        where: { 
          slug: validatedData.slug,
          id: { not: organizationId }
        }
      });

      if (existingOrg) {
        throw createAppError('ALREADY_EXISTS', 'An organization with this slug already exists');
      }
    }

    const organization = await prisma.organization.update({
      where: { id: organizationId },
      data: validatedData,
      include: {
        Member: true,
      }
    });

    const transformedOrg = {
      ...organization,
      createdAt: organization.createdAt.toISOString(),
      Member: organization.Member.map(member => ({
        ...member,
        createdAt: member.createdAt.toISOString(),
      }))
    };

    return c.json(createSuccessResponse(transformedOrg, 'Organization updated successfully'));
  } catch (error) {
    return handleError(error, c);
  }
});

export default app;