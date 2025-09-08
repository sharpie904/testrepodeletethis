"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React, {useEffect, useState} from "react";
import {authClient} from "@/lib/auth-client";
import {Label} from "@/components/ui/label";
import {toast} from "sonner";
import {useInviteNewFamilyMemberPopup} from "@/app/(pages)/families/hooks/use-invite-new-family-member-popup";
import {BetterFetchResponse} from "@better-fetch/fetch";
import {useActiveFamily} from "@/app/state/useActiveFamily";

const InviteFamilyMemberPopup = () => {
    const {inviteFamilyMemberPopupShow, setInviteFamilyMemberPopupShow} = useInviteNewFamilyMemberPopup();
    const [invitationEmailAddress, setInvitationEmailAddress] =
        useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const {name, id} = useActiveFamily((state) => state.family);

    const handleOpenChange = (open: boolean) => {
        if (!open && inviteFamilyMemberPopupShow) {
            return;
        }
        setInviteFamilyMemberPopupShow(open);
    };

    const handleClick = async () => {
        if (invitationEmailAddress.length === 0) {
            setError("Email address cannot be empty");
            return;
        }

        const response: BetterFetchResponse<any> =
            await authClient.organization.inviteMember({
                email: invitationEmailAddress,
                role: "admin",
                organizationId: id as string,
            });

        if (response?.data?.status === "pending") {
            toast("Invitation sent successfully");
        }

        if (response.error !== null && response?.error?.message !== undefined) {
            setError(response?.error?.message);
            return;
        }
        setInviteFamilyMemberPopupShow(false);
        setError("");
        return;
    };

    useEffect(() => {
        if (error !== null) {
            toast(error);
        }
        return () => {
            setError(null);
        };
    }, [error]);

    return (
        <Dialog open={inviteFamilyMemberPopupShow} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Invite Family Member</DialogTitle>
                    <DialogDescription>
                        Sending invitation to <b>{name}</b>, to send an invite to another
                        family please activate to the desired family.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="familyName" className="text-xs w-full">
                            Email
                        </Label>
                        <Input
                            id="familyName"
                            placeholder="ex - Kitty family"
                            className="col-span-3"
                            onChange={(e) => setInvitationEmailAddress(e.target.value)}
                            value={invitationEmailAddress}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        disabled={invitationEmailAddress.length === 0}
                        onClick={handleClick}
                        className={"w-full"}
                        type="submit"
                    >
                        Send Invitation
                    </Button>
                    <Button
                        variant={"destructive"}
                        onClick={() => setInviteFamilyMemberPopupShow(false)}
                        className={"w-full"}
                        type="submit"
                    >
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default InviteFamilyMemberPopup;
