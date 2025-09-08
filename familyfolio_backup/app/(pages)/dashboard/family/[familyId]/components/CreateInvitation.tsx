"use client"

import {Button} from "@/components/ui/button";
import {CardFooter} from "@/components/ui/card";
import {usePopup} from "@/app/(pages)/dashboard/family/context/PopupContext";
import {PopupType} from "@/app/(pages)/dashboard/family/context/types";

const CreateInvitation = () => {
    const {openPopup} = usePopup()
    return (
        <CardFooter className="flex justify-between">
            <Button onClick={() => openPopup(PopupType.INVITE_FAMILY_MEMBER) }>Invite a collaborator</Button>
        </CardFooter>
    )
}

export default CreateInvitation