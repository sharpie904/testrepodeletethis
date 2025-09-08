import {usePopup} from "@/app/(pages)/dashboard/family/context/PopupContext";
import {Button} from "@/components/ui/button";
import {PopupType} from "@/app/(pages)/dashboard/family/context/types";
import {UserPlus} from "lucide-react";

const AddCollaboratorButton = () => {
    const {openPopup} = usePopup();

    return (
        <div>
            <Button
                onClick={() => {
                    openPopup(PopupType.INVITE_FAMILY_MEMBER);
                }}
                variant="ghost"
                size="icon"
                className={"my-auto"}
                title="Invite A Collaborator"
            >
                <UserPlus className="h-5 w-5"/>
            </Button>
        </div>
    )
}

export default AddCollaboratorButton