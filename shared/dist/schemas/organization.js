import { z } from 'zod';
// Organization Schemas
export const CreateOrganizationSchema = z.object({
    name: z.string().min(1, 'Organization name is required').max(100, 'Name too long'),
    slug: z.string().min(1, 'Slug is required').max(100, 'Slug too long')
        .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
});
export const UpdateOrganizationSchema = z.object({
    name: z.string().min(1, 'Organization name is required').max(100, 'Name too long').optional(),
    slug: z.string().min(1, 'Slug is required').max(100, 'Slug too long')
        .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens').optional(),
});
export const OrganizationSchema = z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string().nullable(),
    logo: z.string().nullable(),
    createdAt: z.date(),
    metadata: z.string().nullable(),
});
export const MemberSchema = z.object({
    id: z.string(),
    organizationId: z.string(),
    userId: z.string(),
    email: z.string().email(),
    role: z.enum(['owner', 'admin', 'member']),
    createdAt: z.date(),
});
export const OrganizationWithMembersSchema = OrganizationSchema.extend({
    Member: z.array(MemberSchema),
    FamilyMember: z.array(z.object({
        id: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().nullable(),
        createdAt: z.date(),
        updatedAt: z.date(),
    })).optional(),
});
