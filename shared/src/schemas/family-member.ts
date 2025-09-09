import { z } from 'zod';

// Family Member Schemas
export const CreateFamilyMemberSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name too long'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name too long'),
  email: z.string().email('Invalid email address').optional(),
});

export const UpdateFamilyMemberSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name too long').optional(),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name too long').optional(),
  email: z.string().email('Invalid email address').optional(),
});

export const FamilyMemberSchema = z.object({
  id: z.string(),
  organizationId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const FamilyMemberInformationSchema = z.object({
  id: z.string(),
  familyMemberId: z.string(),
  dateOfBirth: z.date(),
  relationship: z.string(),
  email: z.string().email(),
  phone: z.string(),
});

export const FamilyMemberWithInfoSchema = FamilyMemberSchema.extend({
  memberInformation: FamilyMemberInformationSchema.nullable(),
});

// Export types
export type CreateFamilyMemberInput = z.infer<typeof CreateFamilyMemberSchema>;
export type UpdateFamilyMemberInput = z.infer<typeof UpdateFamilyMemberSchema>;
export type FamilyMember = z.infer<typeof FamilyMemberSchema>;
export type FamilyMemberInformation = z.infer<typeof FamilyMemberInformationSchema>;
export type FamilyMemberWithInfo = z.infer<typeof FamilyMemberWithInfoSchema>;