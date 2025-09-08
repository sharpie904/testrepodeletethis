"use client"

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
import {toast} from "sonner";
import {BetterFetchResponse} from "@better-fetch/fetch";
import {useActiveFamily} from "@/app/state/useActiveFamily";
import {usePopup} from "@/app/(pages)/dashboard/family/context/PopupContext";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Invitation} from "@prisma/client";

const InviteCollaboratorFormSchema = z.object({
    email: z.string({required_error: "Email required"}).email(),
    role: z.enum(["admin", "member", "owner"]),
})

const InviteFamilyMemberPopup = () => {
    const {popupState, closePopup} = usePopup();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const {name, id} = useActiveFamily((state) => state.family);

    const inviteCollaboratorForm = useForm<z.infer<typeof InviteCollaboratorFormSchema>>({
        resolver: zodResolver(InviteCollaboratorFormSchema),
    });


    const handleInvitationSubmit = async (data: z.infer<typeof InviteCollaboratorFormSchema>) => {
        if (data.email.length === 0) {
            setError("Email address cannot be empty");
            return;
        }

        try {
            setIsLoading(true);
            const response: BetterFetchResponse<Invitation> =
                await authClient.organization.inviteMember({
                    email: data.email,
                    role: data.role,
                    organizationId: id as string,
                });

            if (response?.data?.status === "pending") {
                toast("Invitation sent successfully");
            }

            if (response.error !== null && response?.error?.message !== undefined) {
                setError(response?.error?.message);
                return;
            }
            closePopup();
            setError("");
            return;
        } catch (error) {
            setError("Something went wrong");
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }

    }

    useEffect(() => {
        if (error !== null) {
            toast(error);
        }
        return () => {
            setError(null);
        };
    }, [error]);

    const emailValue = inviteCollaboratorForm.watch("email");

    return (
        <Dialog
            open={popupState.isOpen}
            onOpenChange={(open) => !open && closePopup()}
        >
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Invite Family Member</DialogTitle>
                    <DialogDescription>
                        Sending invitation to <b>{name}</b>, to send an invite to another
                        family please activate to the desired family.
                    </DialogDescription>
                </DialogHeader>
                <Form {...inviteCollaboratorForm}>
                    <form onSubmit={inviteCollaboratorForm.handleSubmit(handleInvitationSubmit)}>
                        <FormField render={({field}) => (
                            <FormItem>
                                <FormLabel htmlFor="emailAddress" className="text-xs w-full">Email</FormLabel>
                                <FormControl>
                                    <Input id={"email"} placeholder={"Enter email address"} className={"col-span-3"}
                                           {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )} name={"email"}/>
                        <FormField render={({field}) => (
                            <FormItem>
                                <FormLabel htmlFor="role" className="text-xs w-full">Role</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder={"Select a role"}/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value={"member"}>member</SelectItem>
                                        <SelectItem value={"admin"}>admin</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )} name={"role"}/>
                        <div className={"flex justify-center w-full gap-4 mt-4"}>
                            <Button
                                disabled={(!emailValue || emailValue.length === 0) || isLoading}
                                className="w-full"
                                type="submit"
                            >
                                Send Invitation
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={closePopup}
                                disabled={isLoading}
                                className="w-full"
                                type="submit"
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Form>
                <DialogFooter>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default InviteFamilyMemberPopup;