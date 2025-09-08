"use server"

import {PrismaClient} from "@prisma/client";

export const checkExternalUserAlreadyPresent = async (inviteId: string) => {
    const prisma = new PrismaClient();

    const invitation = await prisma.invitation.findUnique({
        where: {
            id: inviteId
        }
    });

    if (invitation) {
        return await prisma.member.findFirst({
            where: {
                organizationId: invitation.organizationId,
                email: invitation.email,
            }
        });
    }
}

export const getUserRole = async (organizationId: string, email: string) => {
    const prisma = new PrismaClient();

    const response = await prisma.member.findFirst({
        where: {
            organizationId,
            email,
        },
    });
    console.log(organizationId, email);
    const userRole = (response && response?.role) ? response.role : "";
    console.log(userRole);
    return userRole;
}