"use client"

import {authClient} from "@/lib/auth-client";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import {AlertTriangle} from "lucide-react";
import {Button} from "@/components/ui/button";

const DangerZone = ({familyId}: { familyId: string | null }) => {
    const router = useRouter();
    const handleDeleteOrganization = async () => {
        if (familyId !== null) {
            const response = await authClient.organization.delete({
                orgId: familyId,
            });
            router.push("/families");
        } else {
            toast("something weng wrong");
        }
    }

    return (
        <Card className="border-red-500 md:w-[400px] w-full mx-auto my-16 md:mx-0 md:my-12">
            <CardHeader>
                <CardTitle className="text-red-600 flex items-center">
                    <AlertTriangle className="mr-2"/>
                    Danger Zone
                </CardTitle>
                <CardDescription>
                    Actions in this section can have irreversible consequences. Proceed with caution.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Delete Organization</h3>
                    <p className="text-sm text-gray-500">
                        Once you delete an organization, there is no going back. Please be certain.
                    </p>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive">Delete Organization</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the
                                    organization and remove all associated data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDeleteOrganization}
                                                   className="bg-red-600 hover:bg-red-700">
                                    Yes, delete organization
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </CardContent>
        </Card>
    )
}

export default DangerZone;
