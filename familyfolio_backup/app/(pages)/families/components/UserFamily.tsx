"use client";

import {Card, CardContent, CardHeader, CardTitle,} from "@/components/ui/card";
import {Switch} from "@/components/ui/switch";
import {useActiveFamily} from "@/app/state/useActiveFamily";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {usePopup} from "@/app/(pages)/dashboard/family/context/PopupContext";
import {useRefreshTrigger} from "@/app/state/useRefreshTrigger";
import {getUserRole} from "@/app/actions/members";
import {authClient} from "@/lib/auth-client";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import React from "react";

interface UserFamilyProps {
    organization: {
        id: string;
        name: string;
        slug: string;
        createdAt: Date;
        logo?: string | undefined;
        metadata?: any;
    } | null;
    isCurrentSelected: boolean;
}

const UserFamily = ({organization, isCurrentSelected}: UserFamilyProps) => {
    const setActiveFamily = useActiveFamily((state) => state.setActiveFamily);
    const {openPopup} = usePopup()
    const router = useRouter();
    const {refreshTrigger} = useRefreshTrigger();
    const {data} = authClient.useSession()

    const handleCheckChange = async (event: boolean, familyId: string) => {
        if (
            event &&
            ((organization && organization?.id !== null) ||
                organization?.id !== undefined)
        ) {
            const currentUserRole = await getUserRole(familyId, data?.user.email);
            setActiveFamily(organization?.id, organization?.name, organization?.slug, currentUserRole);

            return;
        }
        if (!event) {
            toast(`One family needs to be active at all times.`);
            return;
        }
        return;
    };

    const redirectToFamily = () => {
        refreshTrigger(true);
        router.push("/dashboard/family/" + organization?.id);
    };

    return (
        <Card
            className={"w-full h-[200px] flex flex-col"}
        >
            <CardHeader onClick={isCurrentSelected ? redirectToFamily : () => {
            }}
                        className={isCurrentSelected ? "hover:underline cursor-pointer" : "color:text-red-400 cursor-not-allowed"}>
                <CardTitle>{organization?.name}</CardTitle>
            </CardHeader>
            <CardContent className={"flex-grow"}>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div>
                                {organization && organization?.id &&
                                    <Switch
                                        className={isCurrentSelected ? "cursor-not-allowed" : ""}
                                        checked={isCurrentSelected}
                                        onCheckedChange={(e) => handleCheckChange(e, organization?.id)}
                                    />
                                }
                            </div>
                        </TooltipTrigger>
                        {!isCurrentSelected && <TooltipContent>
                            <p>Select the organization to make changes</p>
                        </TooltipContent>}
                    </Tooltip>
                </TooltipProvider>
            </CardContent>
            {/*<CardFooter>*/}
            {/*    {isCurrentSelected && (*/}
            {/*        <p*/}
            {/*            onClick={() => {*/}
            {/*                openPopup(PopupType.INVITE_FAMILY_MEMBER)*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            invite*/}
            {/*        </p>*/}
            {/*    )}*/}
            {/*</CardFooter>*/}
        </Card>
    );
};

export default UserFamily;
