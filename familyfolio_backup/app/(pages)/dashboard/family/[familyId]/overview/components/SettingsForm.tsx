"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {updateOrganizationName} from "@/app/actions/organizations";
import {toast} from "sonner";
import {SubmitHandler, useForm} from "react-hook-form";
import {usePathname} from "next/navigation";
import {useActiveFamily} from "@/app/state/useActiveFamily";
import generateSlug from "@/lib/generate-slug";

type FormFields = {
    updatedFamilyName: string;
}

const SettingsForm = ({name, id}: { name: string, id: string }) => {
    const {register, handleSubmit} = useForm<FormFields>();
    const currentPath = usePathname();
    const {setActiveFamily, family} = useActiveFamily()

    const handleFormSubmission: SubmitHandler<FormFields> = async (values) => {
        if (values.updatedFamilyName === name) {
            return;
        }

        if (name !== null && name !== "") {
            await updateOrganizationName({name: values.updatedFamilyName, id, currentPath});
            setActiveFamily(id, values.updatedFamilyName, generateSlug(values.updatedFamilyName), family.role);
            toast("Updated family name successfully!");

            return;
        }
        toast("Something went wrong");
        return;
    }

    return (
        <Card className="md:w-[400px] mx-auto my-16 w-full md:mx-0 md:my-12">
            <CardHeader>
                <CardTitle>Family Settings</CardTitle>
                <CardDescription>Manage your family details.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(handleFormSubmission)}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Family Name</Label>
                            <Input {...register("updatedFamilyName")} id="name" defaultValue={name}/>
                        </div>
                    </div>
                    <div className={"flex justify-between gap-2 mt-2"}>
                        <Button className={"w-full"} type={"submit"}>Confirm</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default SettingsForm;