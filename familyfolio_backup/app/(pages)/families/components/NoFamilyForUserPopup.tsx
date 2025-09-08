"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React, {useEffect, useState} from "react";
import {authClient} from "@/lib/auth-client";
import {BetterFetchResponse} from "@better-fetch/fetch";
import {Label} from "@/components/ui/label";
import {toast} from "sonner";
import generateSlug from "@/lib/generate-slug";
import {useNoFamilyForUserPopup} from "@/app/(pages)/families/hooks/use-no-family-for-user-popup";
import {useRouter} from "next/navigation";
import {Member, Invitation, Organization} from "@prisma/client"

interface AcceptInvitationResponse {
    member: Member,
    invitation: Invitation,
}

const NoFamilyForUserPopup = () => {
    const {setNoFamilyForUserPopupShow, noFamilyForUserPopupShow} = useNoFamilyForUserPopup();
    const [familyName, setFamilyName] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const [manualInviteId, setManualInviteId] = useState(false);
    const [inviteId, setInviteId] = useState<string>("");

    const router = useRouter();

    const handleOpenChange = (open: boolean) => {
        if (!open && noFamilyForUserPopupShow) {
            return;
        }
        setNoFamilyForUserPopupShow(open);
    }

    const createFamilyHandler = async () => {
        if (familyName.length === 0) {
            setError("Family name cannot be empty");
            return;
        }

        const response: BetterFetchResponse<any> = await authClient.organization.create({
            name: familyName,
            slug: generateSlug(familyName),
        });

        if (response.error !== null && response?.error?.message !== undefined) {
            setError(response?.error?.message);
            return;
        }
        setNoFamilyForUserPopupShow(false);
        setError("");
        return;
    }

    const acceptManualInvitationHandler = async () => {
        if (inviteId.length === 0) {
            setError("Invite ID cannot be empty");
            return;
        }

        const response: BetterFetchResponse<AcceptInvitationResponse | null> = await authClient.organization.acceptInvitation({
            invitationId: inviteId,
        })
        if (response?.error) {
            setError(response?.error?.message as string);
            return;
        }

        setError("");
        router.refresh();
    }

    useEffect(() => {
        if (error !== null) {
            toast(error);
        }
        return () => {
            setError(null);
        };
    }, [error]);

    return (
        !manualInviteId ? (<Dialog open={noFamilyForUserPopupShow} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>No family found</DialogTitle>
                    <DialogDescription>
                        You are not a part of any family, please create a family and add members to start using
                        FamilyFolio!
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="familyName" className="text-xs w-full">
                            Family Name
                        </Label>
                        <Input
                            id="familyName"
                            placeholder="ex - Kitty family"
                            className="col-span-3"
                            onChange={(e) => setFamilyName(e.target.value)}
                            value={familyName}
                        />
                    </div>
                    <Button disabled={familyName.length === 0} onClick={createFamilyHandler} className={"w-full"}
                            type="submit">Save
                        changes</Button>
                </div>
                <DialogFooter className={"flex"}>
                    <div className={"flex justify-start"}>
                        <p className={"text-sm"}>Already have an invite ID? <p
                            className={"inline underline cursor-pointer"} onClick={() => {
                            setManualInviteId(true);
                        }}>Click here</p>
                        </p>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>) : (
            <Dialog open={noFamilyForUserPopupShow} onOpenChange={handleOpenChange}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Join a family!</DialogTitle>
                        <DialogDescription>
                            Enter your invite ID to join a family
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-0">
                            <Label htmlFor="familyId" className="text-sm w-full">
                                Invite ID
                            </Label>
                            <Input
                                id="familyId"
                                className="col-span-3"
                                onChange={(e) => setInviteId(e.target.value)}
                                value={inviteId}
                            />
                        </div>
                        <Button disabled={inviteId.length === 0} onClick={acceptManualInvitationHandler}
                                className={"w-full"}
                                type="submit">Submit</Button>
                    </div>
                    <DialogFooter className={"flex"}>
                        <div className={"flex justify-start"}>
                            <p className={"text-sm"}>Create a family instead? <p
                                className={"inline underline cursor-pointer"} onClick={() => {
                                setManualInviteId(false);
                            }}>Click here</p>
                            </p>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )
    )
}

export default NoFamilyForUserPopup