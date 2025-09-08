"use client"

import {usePopup} from "@/app/(pages)/dashboard/family/context/PopupContext";
import React, {useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {addNewFamilyMember} from "@/app/actions/family-member";
import {useActiveFamily} from "@/app/state/useActiveFamily";
import {toast} from "sonner";
import {FamilyMemberError} from "@/lib/errors";
import {useRefreshTrigger} from "@/app/state/useRefreshTrigger";

const CreateNewFamilyMemberPopup = () => {
    const {popupState, closePopup} = usePopup();
    const {family} = useActiveFamily();
    const {refreshTrigger} = useRefreshTrigger();

    const [isLoading, setIsLoading] = useState(false);
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const handleClick = async () => {
        if (family.id !== null) {
            try {
                setIsLoading(true);
                await addNewFamilyMember({
                    firstName, lastName, organizationId: family.id, email
                });
                refreshTrigger(true);
                closePopup();
            } catch (error) {
                if (error instanceof FamilyMemberError) {
                    toast(error.message);
                } else {
                    toast("Something went wrong");
                }
            } finally {
                setIsLoading(false);
            }
        } else {
            toast("You can add a new member only in a family currently selected. Please select a family and try again.")
        }
        return;
    }

    return (
        <Dialog
            open={popupState.isOpen}
            onOpenChange={(open) => !open && closePopup()}
        >
            <DialogContent className="sm:max-w-[425px] w-11/12">
                <DialogHeader>
                    <DialogTitle>New Member</DialogTitle>
                    {isLoading && <div>Loading...</div>}
                    <DialogDescription>
                        Add A New Family Member. These fields can be changed later on.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="firstName"
                               className="text-xs w-full after:content-['*'] after:ml-0.5 after:text-red-500">
                            First Name
                        </Label>
                        <Input
                            id="firstName"
                            className="col-span-3"
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                            required={true}
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="lastName"
                               className="text-xs w-full after:content-['*'] after:ml-0.5 after:text-red-500">
                            Last Name
                        </Label>
                        <Input
                            id="lastName"
                            className="col-span-3"
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                            required={true}
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-xs w-full">
                            Email
                        </Label>
                        <Input
                            id="email"
                            className="col-span-3"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required={false}
                        />
                    </div>

                </div>
                <DialogFooter>
                    <div
                        className={"flex-col-reverse justify-evenly md:flex-row-reverse md:justify-around md:w-full"}>
                        <Button
                            disabled={firstName.length === 0 || lastName.length == 0}
                            onClick={handleClick}
                            className="w-full my-2"
                            type="submit"
                        >
                            Save changes
                        </Button>
                        <Button
                            onClick={closePopup}
                            className="w-full my-2"
                            variant="destructive"
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

export default CreateNewFamilyMemberPopup;