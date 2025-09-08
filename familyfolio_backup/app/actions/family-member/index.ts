"use server"

import {PrismaClient} from "@prisma/client";
import {FamilyMemberError} from "@/lib/errors";

export const checkFamilyMemberAlsoUser = async ({organizationId}: { organizationId: string }) => {
    const prisma = new PrismaClient();

    const response = await prisma.familyMember.findMany({
        where: {
            organizationId
        }
    })
    console.log("family member also user>")
    console.log(response);
    console.log("family member also user<")
}

export const addNewFamilyMember = async ({organizationId, firstName, lastName, email}: {
    organizationId: string,
    firstName: string,
    lastName: string,
    email?: string | null,
}) => {
    const prisma = new PrismaClient();

    try {
        // if (!organizationId || !firstName || !lastName) {
        //     console.log("true here");
        //     throw new FamilyMemberError("Missing required fields")
        // }

        const response = await prisma.familyMember.create({
            data: {
                organizationId,
                firstName,
                lastName,
                email: email !== null ? email : null,
            }
        });

        console.log("-=--")
        console.log(response);
        console.log("-=--")

        return response;
    } catch (error) {
        console.log(error);
        if (error instanceof FamilyMemberError) {
            console.log("throwing you")
            throw error;
        } else {
            throw new FamilyMemberError("Unexpected error");
        }
    }
}

export const listFamilyMembers = async ({organizationId}: { organizationId: string }) => {
    const prisma = new PrismaClient();
    const response = await prisma.familyMember.findMany({
        where: {
            organizationId
        },
        orderBy: {
            firstName: 'asc'
        }
    });

    return response;
}