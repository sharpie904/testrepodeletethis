"use client"

import {Button} from "@/components/ui/button";
import {UserPlus} from "lucide-react";
import {usePopup} from "@/app/(pages)/dashboard/family/context/PopupContext";
import {PopupType} from "@/app/(pages)/dashboard/family/context/types";

const AddFamilyProfileButton = () => {
    // const {family} = useActiveFamily();
    const {openPopup} = usePopup();

    return (
        <div>
            <Button
                onClick={() => {
                    openPopup(PopupType.CREATE_NEW_FAMILY_MEMBER);
                }}
                variant="ghost"
                size="icon"
                className={"my-auto"}
                title="Add A Family Member"
            >
                <UserPlus className="h-5 w-5"/>
            </Button>
        </div>
    )
}

export default AddFamilyProfileButton