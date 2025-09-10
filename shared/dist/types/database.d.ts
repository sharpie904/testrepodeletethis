export interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
}
export interface Session {
    id: string;
    expiresAt: Date;
    token: string;
    ipAddress: string | null;
    userAgent: string | null;
    userId: string;
    activeOrganizationId: string | null;
    createdAt: Date;
    updatedAt: Date;
}
export interface Organization {
    id: string;
    name: string;
    slug: string | null;
    logo: string | null;
    createdAt: Date;
    metadata: string | null;
}
export interface Member {
    id: string;
    organizationId: string;
    userId: string;
    email: string;
    role: 'owner' | 'admin' | 'member';
    createdAt: Date;
}
export interface FamilyMember {
    id: string;
    organizationId: string;
    firstName: string;
    lastName: string;
    email: string | null;
    createdAt: Date;
    updatedAt: Date;
}
export interface FamilyMemberInformation {
    id: string;
    familyMemberId: string;
    dateOfBirth: Date;
    relationship: string;
    email: string;
    phone: string;
}
export interface OrganizationWithMembers extends Organization {
    Member: Member[];
    FamilyMember?: FamilyMember[];
}
export interface FamilyMemberWithInfo extends FamilyMember {
    memberInformation: FamilyMemberInformation | null;
}
export type MemberRole = Member['role'];
