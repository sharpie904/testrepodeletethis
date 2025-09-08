"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import React, {useEffect} from "react";
import {usePopup} from "@/app/(pages)/dashboard/family/context/PopupContext";
import useDeleteFamilyCollaborator from "@/app/state/useDeleteFamilyCollaborator";
import {authClient} from "@/lib/auth-client";

const RemoveCollaboratorFromFamilyConfirmationPopup = () => {
    const {popupState, closePopup} = usePopup();
    const {markedCollaborator, clearMarkedCollaborator} = useDeleteFamilyCollaborator();

    const handleRemoveCollaboratorFromFamily = async () => {
        if (markedCollaborator && markedCollaborator.id) {
            await authClient.organization.removeMember({
                memberIdOrEmail: markedCollaborator?.id,
            });
        }
    };

    return (
        <Dialog
            open={popupState.isOpen}
            onOpenChange={(open) => !open && closePopup()}
        >
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete Collaborator?</DialogTitle>
                    <DialogDescription>
                        You are deleting a collaborator. Please note that, <br/>
                        1. They will not be able to access this family unless you resent them an invitation. <br/>
                        2. They will be notified of this action. <br/>
                        3. Their account will continue to exists, this action just removes them from this family. <br/>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <div className={"flex justify-center w-full gap-2"}>
                        <Button
                            variant="destructive"
                            onClick={handleRemoveCollaboratorFromFamily}
                            disabled={false}
                            className="w-full"
                            type="submit"
                        >
                            Confirm
                        </Button>
                        <Button
                            variant="default"
                            onClick={() => {
                                closePopup();
                                clearMarkedCollaborator();
                            }}
                            disabled={false}
                            className="w-full"
                            type="submit"
                        >
                            Cancel
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


export default RemoveCollaboratorFromFamilyConfirmationPopup;