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
import {useCreateNewFamilyPopup} from "@/app/(pages)/families/hooks/use-create-new-family-popup";

const CreateNewFamilyPopup = () => {
    const {setCreateNewFamilyPopupShow, createNewFamilyPopupShow} = useCreateNewFamilyPopup();
    const [familyName, setFamilyName] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const handleOpenChange = (open: boolean) => {
        if (!open && createNewFamilyPopupShow) {
            return;
        }
        setCreateNewFamilyPopupShow(open);
    }

    const handleClick = async () => {
        const response: BetterFetchResponse<any> = await authClient.organization.create({
            name: familyName,
            slug: generateSlug(familyName),
        });

        if (response.error !== null && response?.error?.message !== undefined) {
            setError(response?.error?.message);
            return;
        }
        setCreateNewFamilyPopupShow(false);
        setError("");
        return;
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
        <Dialog open={createNewFamilyPopupShow} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create a new family</DialogTitle>
                    <DialogDescription>
                        Give your family a name
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
                </div>
                <DialogFooter>
                    <Button disabled={familyName.length === 0} onClick={handleClick} className={"w-full"} type="submit">Save
                        changes</Button>
                    <Button onClick={() => setCreateNewFamilyPopupShow(false)} className={"w-full"}
                            variant={"destructive"} type="submit">Cancel</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreateNewFamilyPopup