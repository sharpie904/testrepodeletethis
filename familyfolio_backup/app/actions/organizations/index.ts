"use server"

import {PrismaClient} from "@prisma/client";
import generateSlug from "@/lib/generate-slug";
import {revalidatePath} from "next/cache";

export const deleteOrganization = async () => {
}

export const updateOrganizationName = async ({name, id, currentPath}: {
    name: string,
    id: string,
    currentPath: string
}) => {
    const prisma = new PrismaClient();
    const slug = generateSlug(name);
    console.log(name, id, slug);

    const response = await prisma.organization.update({
        where: {
            id,
        },
        data: {
            name,
            slug,
        }
    })
    console.log(response);
    revalidatePath(currentPath);

    return;
}

export const getFullOrganization = async (organizationId: string) => {
    const prisma = new PrismaClient();

    return await prisma.organization.findUnique({
        where: {
            id: organizationId,
        },
        include: {
            Member: true,
            Invitation: true,
            FamilyMember: true,
        }
    });
}

export const addFamilyMemberInOrganization = async ({firstName, lastName, organizationId}: {
    firstName: string,
    lastName: string,
    organizationId: string
}) => {
    const prisma = new PrismaClient();

    const info = await prisma.familyMember.create({
        data: {
            firstName,
            lastName,
            organizationId,
        }
    });

    return info;
}
