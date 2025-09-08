"use client"

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import RoleGuard from "@/components/RoleGuard";
import {useActiveFamily} from "@/app/state/useActiveFamily";
import {useEffect, useState} from "react";
import {authClient} from "@/lib/auth-client";
import {usePopup} from "@/app/(pages)/dashboard/family/context/PopupContext";
import {PopupType} from "@/app/(pages)/dashboard/family/context/types";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import useDeleteFamilyCollaborator from "@/app/state/useDeleteFamilyCollaborator";

const CollaboratorCard = ({email, role, id}: { email: string, role: string, id: string }) => {
    const [userRole, setUserRole] = useState<string | null>(null);
    const {family} = useActiveFamily();
    const {markForDeletion, markedCollaborator} = useDeleteFamilyCollaborator();
    const {data: user} = authClient.useSession();

    const deleteCollaboratorFromFamily = () => {
        console.log("marking for deletion");
        markForDeletion({id});
        console.log(markedCollaborator);
    }

    useEffect(() => {
        if (family && family.role) {
            setUserRole(family.role)
        }
    }, [family]);

    const {openPopup} = usePopup();

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>{email}</CardTitle>
                <CardDescription>{role}{email === user.user.email ? " (you)" : ""}</CardDescription>
            </CardHeader>
            <CardContent>
            </CardContent>
            <CardFooter className="flex justify-around gap-2">
                <RoleGuard role={userRole} memberClassName={"hidden"}>
                    {email !== user.user.email &&
                        (role !== "owner") &&
                        <Button variant="outline"
                                onClick={() => {
                                    openPopup(PopupType.REMOVE_COLLABORATOR_FROM_FAMILY_CONFIRMATION)
                                    deleteCollaboratorFromFamily()
                                }}>Remove
                            from
                            family</Button>}
                    {role === "owner" && userRole !== "owner" &&
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className={"cursor-not-allowed"}>
                                        <Button variant="outline" disabled>Remove
                                            from family</Button>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Only the owner can update their account</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    }
                </RoleGuard>
                <RoleGuard role={userRole} memberClassName={"hidden"}>
                    {(email !== user.user.email && role !== "owner") &&
                        <Button variant="outline">Change Membership</Button>}
                    {role === "owner" && userRole !== "owner" &&
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className={"cursor-not-allowed"}>
                                        <Button variant="outline" disabled>Change Membership</Button>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Only the owner can update their account</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    }
                </RoleGuard>
            </CardFooter>
        </Card>
    )
}

export default CollaboratorCard