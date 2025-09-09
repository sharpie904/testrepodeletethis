import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import type { AuthType } from "../lib/auth.js";
import { protectRoute } from "../middleware/auth.js";
import { handleError, createSuccessResponse, createAppError } from "../lib/errors.js";
import { validateSchema, CreateFamilyMemberSchema, UpdateFamilyMemberSchema } from "shared";

const prisma = new PrismaClient();
const app = new Hono<{ Variables: AuthType }>();

// Get all family members for an organization
app.get("/:organizationId", protectRoute, async (c) => {
  try {
    const organizationId = c.req.param("organizationId");
    const user = c.get("user");

    // Check if user has access to this organization
    const member = await prisma.member.findFirst({
      where: {
        organizationId,
        userId: user!.id
      }
    });

    if (!member) {
      throw createAppError('FORBIDDEN', 'You do not have access to this organization');
    }

    const familyMembers = await prisma.familyMember.findMany({
      where: { organizationId },
      orderBy: { firstName: 'asc' }
    });

    const transformedMembers = familyMembers.map(member => ({
      ...member,
      createdAt: member.createdAt.toISOString(),
      updatedAt: member.updatedAt.toISOString(),
    }));

    return c.json(createSuccessResponse(transformedMembers));
  } catch (error) {
    return handleError(error, c);
  }
});

// Create a new family member
app.post("/:organizationId", protectRoute, async (c) => {
  try {
    const organizationId = c.req.param("organizationId");
    const user = c.get("user");
    const body = await c.req.json();
    
    const validatedData = validateSchema(CreateFamilyMemberSchema, body);

    // Check if user has permission to add members
    const member = await prisma.member.findFirst({
      where: {
        organizationId,
        userId: user!.id,
        role: { in: ["owner", "admin"] }
      }
    });

    if (!member) {
      throw createAppError('INSUFFICIENT_PERMISSIONS', 'You do not have permission to add family members');
    }

    // Check if family member already exists
    const existingMember = await prisma.familyMember.findFirst({
      where: {
        organizationId,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
      }
    });

    if (existingMember) {
      throw createAppError('ALREADY_EXISTS', 'A family member with this name already exists');
    }

    const familyMember = await prisma.familyMember.create({
      data: {
        organizationId,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email || null
      }
    });

    const transformedMember = {
      ...familyMember,
      createdAt: familyMember.createdAt.toISOString(),
      updatedAt: familyMember.updatedAt.toISOString(),
    };

    return c.json(createSuccessResponse(transformedMember, 'Family member created successfully'));
  } catch (error) {
    return handleError(error, c);
  }
});

// Get a specific family member
app.get("/:organizationId/:memberId", protectRoute, async (c) => {
  try {
    const organizationId = c.req.param("organizationId");
    const memberId = c.req.param("memberId");
    const user = c.get("user");

    // Check if user has access to this organization
    const member = await prisma.member.findFirst({
      where: {
        organizationId,
        userId: user!.id
      }
    });

    if (!member) {
      throw createAppError('FORBIDDEN', 'You do not have access to this organization');
    }

    const familyMember = await prisma.familyMember.findFirst({
      where: {
        id: memberId,
        organizationId
      },
      include: {
        memberInformation: true
      }
    });

    if (!familyMember) {
      throw createAppError('NOT_FOUND', 'Family member not found');
    }

    const transformedMember = {
      ...familyMember,
      createdAt: familyMember.createdAt.toISOString(),
      updatedAt: familyMember.updatedAt.toISOString(),
      memberInformation: familyMember.memberInformation ? {
        ...familyMember.memberInformation,
        dateOfBirth: familyMember.memberInformation.dateOfBirth.toISOString(),
      } : null,
    };

    return c.json(createSuccessResponse(transformedMember));
  } catch (error) {
    return handleError(error, c);
  }
});

// Update a family member
app.put("/:organizationId/:memberId", protectRoute, async (c) => {
  try {
    const organizationId = c.req.param("organizationId");
    const memberId = c.req.param("memberId");
    const user = c.get("user");
    const body = await c.req.json();
    
    const validatedData = validateSchema(UpdateFamilyMemberSchema, body);

    // Check if user has permission to update members
    const member = await prisma.member.findFirst({
      where: {
        organizationId,
        userId: user!.id,
        role: { in: ["owner", "admin"] }
      }
    });

    if (!member) {
      throw createAppError('INSUFFICIENT_PERMISSIONS', 'You do not have permission to update family members');
    }

    // Check if family member exists
    const existingMember = await prisma.familyMember.findFirst({
      where: {
        id: memberId,
        organizationId
      }
    });

    if (!existingMember) {
      throw createAppError('NOT_FOUND', 'Family member not found');
    }

    const familyMember = await prisma.familyMember.update({
      where: { id: memberId },
      data: validatedData
    });

    const transformedMember = {
      ...familyMember,
      createdAt: familyMember.createdAt.toISOString(),
      updatedAt: familyMember.updatedAt.toISOString(),
    };

    return c.json(createSuccessResponse(transformedMember, 'Family member updated successfully'));
  } catch (error) {
    return handleError(error, c);
  }
});

// Delete a family member
app.delete("/:organizationId/:memberId", protectRoute, async (c) => {
  try {
    const organizationId = c.req.param("organizationId");
    const memberId = c.req.param("memberId");
    const user = c.get("user");

    // Check if user has permission to delete members
    const member = await prisma.member.findFirst({
      where: {
        organizationId,
        userId: user!.id,
        role: { in: ["owner", "admin"] }
      }
    });

    if (!member) {
      throw createAppError('INSUFFICIENT_PERMISSIONS', 'You do not have permission to delete family members');
    }

    // Check if family member exists
    const existingMember = await prisma.familyMember.findFirst({
      where: {
        id: memberId,
        organizationId
      }
    });

    if (!existingMember) {
      throw createAppError('NOT_FOUND', 'Family member not found');
    }

    await prisma.familyMember.delete({
      where: { id: memberId }
    });

    return c.json(createSuccessResponse(null, 'Family member deleted successfully'));
  } catch (error) {
    return handleError(error, c);
  }
});

// Get user role in organization
app.get("/:organizationId/role", protectRoute, async (c) => {
  try {
    const organizationId = c.req.param("organizationId");
    const user = c.get("user");

    const member = await prisma.member.findFirst({
      where: {
        organizationId,
        userId: user!.id
      }
    });

    return c.json(createSuccessResponse({ role: member?.role || null }));
  } catch (error) {
    return handleError(error, c);
  }
});

export default app;